import jsPdf from 'jspdf';
import dealerHeader from '../constants/dealerHeader.js';

const getPdf = (orderedDetailsToPrint,type) => {

    console.log('orderedDetailsToPrint : ',orderedDetailsToPrint);
    console.log('type : ',type);
    
    let documentPdf = new jsPdf(
    {
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts:true,
        floatPrecision: 16 // or "smart", default is 16
    }
    );

    documentPdf.addImage(dealerHeader,'jpg',0,10,210,40);

    if(type === 'ficheExpertise'){
        documentPdf.text(orderedDetailsToPrint[5].value.toUpperCase()+' '+orderedDetailsToPrint[6].value+' '+orderedDetailsToPrint[7].value, 15, 60);
        documentPdf.line(15,65,105,65)
        documentPdf.setFontSize(11);
        let Xline = 70;
        orderedDetailsToPrint && orderedDetailsToPrint.map((element) => {
            
                if(element === 'divider' && Xline > 70){
                    Xline += 5;
                    documentPdf.line(20,Xline,190,Xline)
                }else if(element.visibleOnPdf === true){
                    Xline += 5;
                    let dX = documentPdf.getTextWidth(element.title);
                    documentPdf.setFontStyle('bold');
                    documentPdf.text(element.title, 15, Xline)
                    documentPdf.setFontStyle('normal');
                    documentPdf.text('  : '+element.value, dX + 15, Xline)
                }
        })
    
        /**CONTRACT DETAILS */
        documentPdf.setFontSize(14);
        documentPdf.setFontStyle('bold');
    
        documentPdf.save('expertise_'+orderedDetailsToPrint[0].value+'.pdf');

    }else if(type === 'bonReprise'){

        documentPdf.text('Bon de reprise : '+orderedDetailsToPrint[5].value.toUpperCase()+' '+orderedDetailsToPrint[6].value+' '+orderedDetailsToPrint[7].value, 15, 60);
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
                    documentPdf.text(element.title, 15, Xline)
                    documentPdf.setFontStyle('normal');
                    documentPdf.text('  : '+element.value, dX + 15, Xline)
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

    documentPdf.save('reprise_' + orderedDetailsToPrint[0].value+'.pdf');
    }
    
}

export default getPdf;