import jsPdf from 'jspdf';
import AWS from 'aws-sdk';
var moment = require('moment');

const getPdf = async(stockList,logInfo,setLoader) => {

    console.log('stockList : ',stockList);
    let s3 = new AWS.S3();

        let documentPdf = new jsPdf(
            {
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4',
                putOnlyUsedFonts:true,
                floatPrecision: 16 // or "smart", default is 16
            }
            );
  
            documentPdf.text(logInfo.company.name + ' - liste occasion du ' + moment().format('DD/MM/YYYY'), 15, 15);
            documentPdf.line(15,20,280,20);
            documentPdf.setFontSize(8);
            let Xline = 25;
            let page = 1;
            let index = 0;

            let rows = [];

            const rowsBuilder = new Promise((resolve,reject) => {
                stockList && stockList.sort((a,b)=> {
                    if(a.machine.nature.name < b.machine.nature.name){
                        return -1;
                    }
                    if(a.machine.nature.name > b.machine.nature.name){
                        return 1;
                    }
                    return 0;
                    })
                    .map(async(m) =>{
                        let picture = await Promise.resolve((m.pictures.leftFront || m.pictures.rightFront || m.pictures.rightBack || m.pictures.leftBack).replace('%2F','/'));
                        let splitted = await Promise.resolve(picture.split('/'));
                        let key = await Promise.resolve(splitted[splitted.length-1]);
                        let folder = await Promise.resolve(splitted[splitted.length-2]);
                        let params = await Promise.resolve({Bucket : 'inspekt-prod',Key:`${folder}/${key}`})
                
                        const getRow = new Promise(async(resolve,reject) => {
                            s3.getObject(params, async(err, data) => {
                                let blob = await Promise.resolve(new Blob([data.Body], {type: 'image/jpeg'}));
                                var pictureReader = new FileReader();
                                    pictureReader.readAsDataURL(blob); 
                                    pictureReader.onloadend = async() => {
                                        let picturebase64data = await Promise.resolve(pictureReader.result);
                                        let row = {miniature : picturebase64data,machineFeatures : m.machineFeatureToString,nature : m.machine.nature.name, brand : m.machine.brand,model : m.machine.model,year : m.machine.year,id : m.id,stockInfo : m.stockInfo};
                                        resolve(row)             
                                    }
                            })
                        }) 

                        getRow.then((value) => {
                            rows = [...rows,value];
                            index += 1;
                            stockList.length === index && resolve(rows)
                        })
                    })})

            rowsBuilder.then((value) => {

                index = 0;

                const pdfBuilder = new Promise(async(resolve,reject) => {
                    value.sort(
                        (a,b) => {
                            if(a.nature < b.nature){
                                return -1;
                            }
                            if(a.nature > b.nature){
                                return 1;
                            }
                            return 0;
                        }
                    ).map(async(row) => {
                        if(Xline > 170){
                            page += 1;
                            documentPdf.insertPage(page);
                            documentPdf.setPage(page);
                            Xline = 15;
                        }
                        let pictureRatio = documentPdf.getImageProperties(row.miniature).width / documentPdf.getImageProperties(row.miniature).height;
                        documentPdf.addImage(row.miniature,'JPEG',15,Xline,30 * pictureRatio,30);
                        let splittedText = documentPdf.splitTextToSize(row.machineFeatures,120);
                        documentPdf.text(80,Xline+2,[row.nature,row.brand + ' ' + row.model,'Année : ' + row.year]);
                        documentPdf.text(120,Xline+2,splittedText);
                        documentPdf.text(250,Xline+2,['N° ERP : ' + row.stockInfo.erpId,row.stockInfo.customerSalePrice + '€']);
                        splittedText.length > 10
                        ? Xline += splittedText.length * 4
                        : Xline += 32
                        documentPdf.line(15,Xline,280,Xline);
                        Xline += 2;
                        index += 1;
                        stockList.length === index && resolve(true)
                    })
                })
                
                pdfBuilder.then(()=>{
                    documentPdf.save('ListeOccasion_100820.pdf');
                    setLoader({isOpen:false});
                })
            })
}

export default getPdf;