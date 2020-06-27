import jsPdf from 'jspdf';
import AWS from 'aws-sdk';

const getPdf = async(orderedDetailsToPrint,type,logInfo) => {

    let s3 = new AWS.S3();
    
    const bucket = 'inspekt-prod';
    const key = 'COMPANIES/HEADERS/' + logInfo.company.header;
    let params = {Bucket: bucket, Key: key}

    

    const base64dealerHeader = new Promise((resolve,reject) => {
        
        s3.getObject(params, async(err, data) => {
        
        let blob=new Blob([data.Body], {type: data.ContentType});
        var reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = async() => {
            let base64data = await Promise.resolve(reader.result);
            resolve(base64data);
        }
        
        })
    })

    base64dealerHeader.then((value) => {
        let documentPdf = new jsPdf(
            {
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                putOnlyUsedFonts:true,
                floatPrecision: 16 // or "smart", default is 16
            }
            );
        documentPdf.addImage(value,'JPG',0,10,210,40);

        if(type === 'ficheExpertise'){
            
            const title = orderedDetailsToPrint.map((element) => {
                if(element.property === 'nature'
                || element.property === 'brand'
                || element.property === 'model'
                ){
                    return element.value
                }
            }).join(' ');
    
            documentPdf.text('Fiche d\'expertise : '+title, 15, 60);
            documentPdf.line(15,65,105,65)
            documentPdf.setFontSize(11);
            let Xline = 70;
            orderedDetailsToPrint && orderedDetailsToPrint.map((element) => {
                
                    if(element === 'divider' && Xline > 70){
                        documentPdf.line(20,Xline,190,Xline)
                        Xline += 5;
                    }else if(element.visibleOnPdf === true){
                        let dX = documentPdf.getTextWidth(element.title);
                        documentPdf.setFontStyle('bold');
                        documentPdf.text(element.title, 15, Xline)
                        documentPdf.setFontStyle('normal');
                        documentPdf.text('  : '+element.value, dX + 15, Xline,{maxWidth:'150'})
                        let informationLength = documentPdf.getTextWidth(element.title + element.value) + 15;
                        
                        //on passe une ligne si le texte génère un retour à la ligne (= longueur > 150)
                        informationLength > 150 
                        ? Xline += 10
                        : Xline += 5

                    }
            })
        
            /**CONTRACT DETAILS */
            documentPdf.setFontSize(14);
            documentPdf.setFontStyle('bold');
        
            documentPdf.save('expertise_'+orderedDetailsToPrint[0].value+'.pdf');
    
        }else if(type === 'bonReprise'){
    
            const title = orderedDetailsToPrint.map((element) => {
                if(element.property === 'nature'
                || element.property === 'brand'
                || element.property === 'model'
                ){
                    return element.value
                }
            }).join(' ');
    
            documentPdf.text('Bon de reprise : '+title, 15, 60);
            documentPdf.line(15,65,105,65)
            documentPdf.setFontSize(11);
            let Xline = 70;
            orderedDetailsToPrint && orderedDetailsToPrint.map((element) => {
                
                    if(element === 'divider' && Xline > 70){ //UNABLE TO SET A DIVIDER TO BEGIN
                        Xline += 5;
                        documentPdf.line(20,Xline,190,Xline)
                    }else if(element.visibleOnPdf === true){
                        Xline += 5;
                        let dX = documentPdf.getTextWidth(element.title);
                        documentPdf.setFontStyle('bold');
                        documentPdf.rect(15,Xline-3,3,3)
                        documentPdf.text(element.title, 20, Xline)
                        documentPdf.setFontStyle('normal');
                        documentPdf.text('  : '+element.value, dX + 20, Xline,{maxWidth:'150'})
                    }
            })
            Xline += 10;
            documentPdf.setFontSize(9);
            documentPdf.text('Signature concession',15,Xline);
            documentPdf.text('Signature client',120,Xline);
            documentPdf.line(15,Xline+2,55,Xline+2)
            documentPdf.line(120,Xline+2,160,Xline+2)
            documentPdf.setFontSize(8);
            documentPdf.text('"Je déclare ne pas avoir connaissance',120,Xline += 8);
            documentPdf.text('de vices cachés sur cette machine."',120,Xline += 3);
    
            /**CONTRACT DETAILS */
            documentPdf.setFontSize(14);
            documentPdf.setFontStyle('bold');
        
            documentPdf.save('reprise_' + orderedDetailsToPrint[0].value+'.pdf');
        }else if(type === 'contreExpertise'){
    
            const title = orderedDetailsToPrint.map((element) => {
                if(element.property === 'nature'
                || element.property === 'brand'
                || element.property === 'model'
                ){
                    return element.value
                }
            }).join(' ');
    
            documentPdf.text('Contre expertise : '+title, 15, 60);
            documentPdf.line(15,65,105,65)
            documentPdf.setFontSize(11);
            let Xline = 70;
            orderedDetailsToPrint && orderedDetailsToPrint.map((element) => {
                
                    if(element === 'divider' && Xline > 70){ //UNABLE TO SET A DIVIDER TO BEGIN
                        Xline += 5;
                        documentPdf.line(20,Xline,190,Xline)
                    }else if(element.visibleOnPdf === true){
                        Xline += 5;
                        let dX = documentPdf.getTextWidth(element.title);
                        documentPdf.setFontStyle('bold');
                        documentPdf.rect(15,Xline-3,3,3)
                        documentPdf.text(element.title, 20, Xline)
                        documentPdf.setFontStyle('normal');
                        documentPdf.text('  : '+element.value, dX + 20, Xline,{maxWidth:'150'})
                    }
            })
            Xline += 10;
            documentPdf.setFontSize(9);
            documentPdf.text('Signature concession',15,Xline);
            documentPdf.text('Signature client',120,Xline);
            documentPdf.line(15,Xline+2,55,Xline+2)
            documentPdf.line(120,Xline+2,160,Xline+2)
    
            /**CONTRACT DETAILS */
            documentPdf.setFontSize(14);
            documentPdf.setFontStyle('bold');
        
            documentPdf.save('contreExpertise_' + orderedDetailsToPrint[0].value+'.pdf');
        }
    })

    //documentPdf.addImage(dealerHeader,'JPG',0,10,210,40);

    
    
}

export default getPdf;