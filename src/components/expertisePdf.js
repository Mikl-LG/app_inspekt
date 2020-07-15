import jsPdf from 'jspdf';
import AWS from 'aws-sdk';

const getPdf = async(orderedDetailsToPrint,type,logInfo,pictures,setLoader) => {

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
            documentPdf.line(15,65,105,65);
            documentPdf.setFontSize(11);
            let Xline = 70;
            orderedDetailsToPrint && orderedDetailsToPrint.map((element) => {
                
                    if(element === 'divider' && Xline > 70){
                        documentPdf.line(20,Xline,190,Xline);
                        Xline += 5;
                    }else if(element.visibleOnPdf === true){
                        let dX = documentPdf.getTextWidth(element.title);
                        documentPdf.setFontStyle('bold');
                        documentPdf.text(element.title, 15, Xline);
                        documentPdf.setFontStyle('normal');
                        documentPdf.text('  : '+element.value, dX + 15, Xline,{maxWidth:'150'});
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
            documentPdf.line(15,65,105,65);
            documentPdf.setFontSize(11);
            let Xline = 70;
            orderedDetailsToPrint && orderedDetailsToPrint.map((element) => {
                
                    if(element === 'divider' && Xline > 70){ //UNABLE TO SET A DIVIDER TO BEGIN
                        documentPdf.line(20,Xline,190,Xline)
                        Xline += 5;
                    }else if(element.visibleOnPdf === true){
                        let dX = documentPdf.getTextWidth(element.title);
                        documentPdf.setFontStyle('bold');
                        documentPdf.rect(15,Xline-3,3,3);
                        documentPdf.text(element.title, 20, Xline);
                        documentPdf.setFontStyle('normal');
                        documentPdf.text('  : '+element.value, dX + 20, Xline,{maxWidth:'150'});
                        let informationLength = documentPdf.getTextWidth(element.title + element.value) + 15;
                        
                        //on passe une ligne si le texte génère un retour à la ligne (= longueur > 150)
                        informationLength > 150 
                        ? Xline += 10
                        : Xline += 5
                    }
            })
            Xline += 10;
            documentPdf.setFontSize(9);
            documentPdf.text('Signature concession',15,Xline);
            documentPdf.text('Signature client',120,Xline);
            documentPdf.line(15,Xline+2,55,Xline+2);
            documentPdf.line(120,Xline+2,160,Xline+2);
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
                        documentPdf.line(20,Xline,190,Xline);
                        Xline += 5;
                    }else if(element.visibleOnPdf === true){
                        let dX = documentPdf.getTextWidth(element.title);
                        documentPdf.setFontStyle('bold');
                        documentPdf.rect(15,Xline-3,3,3);
                        documentPdf.text(element.title, 20, Xline);
                        documentPdf.setFontStyle('normal');
                        documentPdf.text('  : '+element.value, dX + 20, Xline,{maxWidth:'150'});
                        let informationLength = documentPdf.getTextWidth(element.title + element.value) + 15;
                        
                        //on passe une ligne si le texte génère un retour à la ligne (= longueur > 150)
                        informationLength > 150 
                        ? Xline += 10
                        : Xline += 5
                    }
            })
            Xline += 10;
            documentPdf.setFontSize(9);
            documentPdf.text('Signature concession',15,Xline);
            documentPdf.text('Signature client',120,Xline);
            documentPdf.line(15,Xline+2,55,Xline+2);
            documentPdf.line(120,Xline+2,160,Xline+2);
    
            /**CONTRACT DETAILS */
            documentPdf.setFontSize(14);
            documentPdf.setFontStyle('bold');
        
            documentPdf.save('contreExpertise_' + orderedDetailsToPrint[0].value+'.pdf');
        
        }else if(type === 'fichePhotos'){
    
            const title = orderedDetailsToPrint.map((element) => {
                if(element.property === 'nature'
                || element.property === 'brand'
                || element.property === 'model'
                ){
                    return element.value
                }
            }).join(' ');
    
            documentPdf.text(title, 15, 60);
            documentPdf.line(15,65,105,65);
            documentPdf.setFontSize(11);
            let Xline = 70;
            orderedDetailsToPrint && orderedDetailsToPrint.map((element) => {
                
                    if(element === 'divider' && Xline > 70){ //UNABLE TO SET A DIVIDER TO BEGIN
                        documentPdf.line(20,Xline,190,Xline);
                        Xline += 5;
                    }else if(element.visibleOnPdf === true){
                        let dX = documentPdf.getTextWidth(element.title);
                        documentPdf.setFontStyle('bold');
                        //documentPdf.rect(15,Xline-3,3,3)
                        documentPdf.text(element.title, 20, Xline);
                        documentPdf.setFontStyle('normal');
                        documentPdf.text('  : '+element.value, dX + 20, Xline,{maxWidth:'150'});
                        let informationLength = documentPdf.getTextWidth(element.title + element.value) + 15;
                        
                        //on passe une ligne si le texte génère un retour à la ligne (= longueur > 150)
                        informationLength > 150 
                        ? Xline += 10
                        : Xline += 5
                    }
            })
            documentPdf.addPage();
            documentPdf.setPage(2);

            const downloadPictures = new Promise(async(resolve,reject) => {

                let base64ArrayPictures = [];
                let n = 0;
                const keys = await Promise.resolve(Object.keys(pictures)); //[leftFront,rightBack]
                keys.map(async(k) => {                      
                        let picture = await Promise.resolve(pictures[k].replace('%2F','/'));
                        let splitted = await Promise.resolve(picture.split('/'));
                        let key = await Promise.resolve(splitted[splitted.length-1]);
                        let params = await Promise.resolve({Bucket : 'inspekt-prod',Key:`MEDIASLANDER/${key}`})
                
                        s3.getObject(params, async(err, data) => {
                            let blob = await Promise.resolve(new Blob([data.Body], {type: data.ContentType}));
                            var pictureReader = new FileReader();
                            pictureReader.readAsDataURL(blob); 
                            pictureReader.onloadend = async() => {
                                let picturebase64data = await Promise.resolve(pictureReader.result);
                                base64ArrayPictures = await Promise.resolve([...base64ArrayPictures,picturebase64data]);
                                base64ArrayPictures.length === keys.length
                                && resolve(base64ArrayPictures)             
                            }
                        })  
                })
            })

            const pictureHeightSelected = 85;
            downloadPictures.then((arrayOfPictures) => {
                Xline =10;
                arrayOfPictures.forEach((picture) => {
                    if(Xline >= 290 - pictureHeightSelected){
                        documentPdf.insertPage(2);
                        documentPdf.setPage(2);
                        Xline =10;
                    }
                    let pictureRatio = documentPdf.getImageProperties(picture).width / documentPdf.getImageProperties(picture).height;
                    let leftMargin = (210 - pictureHeightSelected * pictureRatio) / 2;
                    documentPdf.addImage(picture,'JPG',leftMargin,Xline,pictureHeightSelected*pictureRatio,pictureHeightSelected);
                    Xline += pictureHeightSelected + 5;
                })

                documentPdf.save('fichePhoto_' + orderedDetailsToPrint[0].value+'.pdf');
                setLoader({isOpen:false});
            })
        }
    })
}

export default getPdf;