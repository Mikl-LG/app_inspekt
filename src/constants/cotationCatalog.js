import Natures from '../constants/Natures';

const brands = {
    reachMower:[
        'NOREMAT',
        'ROUSSEAU',
        'KUHN',
        'MC CONNEL'
    ]
}

const CotationCatalog = {

    reachMower: 
        {
            NOREMAT: {

                NOREMAT:
                    [   
                        {
                            range:'MAGISTRA',
                            model:'M55',
                            purchasePriceList : {2004 : 25268, 2005 : 26515, 2006 : 27842,2007 : 28757,2008 : 30553,2009 : 32029,2010 : 32229,2011 : 33406,2012 : 34094},
                            firstYearDevaluation : 20,
                            secondYearDevaluation : 15,
                            standardYearDevaluation : 8,
                            damages:[
                                {name : 'Bâti', key:'framework',price:'1217,14'},
                                {name : 'Kit bagues-axes-bielles', key:'axlesKit',price:'300'},
                                {name : 'Kit hydraulique', key:'hydraulicKit',price:'1839'},
                                {name : 'Kit groupe', key:'groupKit',price:'1000'},
                                {name : 'Réservoir', key:'tank',price:'253,5'},
                                {name : 'Pivot orientation machine', key:'orientationAxle',price:'687,55'},
                                {name : 'Vérin orientation', key:'orientationCylinder',price:'84,17'},
                                {name : 'Flèche', key:'linkage',price:'784,38'},
                                {name : 'Vérin de flèche droit', key:'rightLinkageCylinder',price:'85,68'},
                                {name : 'Vérin de flèche gauche', key:'leftLinkageCylinder',price:'85,68'},
                                {name : 'Vérin de support téléscopique', key:'telescopicHandlerCylinder',price:'130'},
                                {name : 'Support téléscopique', key:'telescopicHandler',price:'850'},
                                {name : 'Téléscopique mâle', key:'maleTelescope',price:'850'},
                                {name : 'Vérin de téléscopique', key:'telescopicCylinder',price:'200'},
                                {name : 'Pivot groupe', key:'groupAxle',price:'250'},
                                {name : 'Vérin de groupe', key:'groupCylinder',price:'60.25'},
                                {name : 'Rotor + paliers', key:'rotorKit',price:'876'},
                            ]
                        },
                        {
                            range:'MAGISTRA',
                            model:'M60',
                            purchasePriceList : {2004 : 25885, 2005 : 27163, 2006 : 28508,2007 : 29459,2008 : 31300,2009 : 32821,2010 : 33021,2011 : 34207,2012 : 34913},
                            firstYearDevaluation : 15,
                            secondYearDevaluation : 10,
                            standardYearDevaluation : 8,
                            damages:[
                                {name : 'Bâti', key:'framework',price:'1217.14'},
                                {name : 'Kit bagues-axes-bielles', key:'axlesKit',price:'300'},
                                {name : 'Kit hydraulique', key:'hydraulicKit',price:'1839'},
                                {name : 'Kit groupe', key:'groupKit',price:'1000'},
                                {name : 'Réservoir', key:'tank',price:'253,5'},
                                {name : 'Pivot orientation machine', key:'orientationAxle',price:'687,55'},
                                {name : 'Vérin orientation', key:'orientationCylinder',price:'84,17'},
                                {name : 'Flèche', key:'linkage',price:'784,38'},
                                {name : 'Vérin de flèche droit', key:'rightLinkageCylinder',price:'85,68'},
                                {name : 'Vérin de flèche gauche', key:'leftLinkageCylinder',price:'85,68'},
                                {name : 'Vérin de support téléscopique', key:'telescopicHandlerCylinder',price:'130'},
                                {name : 'Support téléscopique', key:'telescopicHandler',price:'850'},
                                {name : 'Téléscopique mâle', key:'maleTelescope',price:'850'},
                                {name : 'Vérin de téléscopique', key:'telescopicCylinder',price:'200'},
                                {name : 'Pivot groupe', key:'groupAxle',price:'250'},
                                {name : 'Vérin de groupe', key:'groupCylinder',price:'60.25'},
                                {name : 'Rotor + paliers', key:'rotorKit',price:'876'},
                            ]
                        }
                    ]
            }
        }
}

const getAllBrands = async(nature) => {
    const allBrands = await Promise.resolve(brands[nature]);
    return allBrands;
}

const getAllModels = async(nature,catalogSupplier,brand,range) => {
    if(nature && catalogSupplier && brand && range){
        const allMachines = await Promise.resolve(CotationCatalog[nature][catalogSupplier][brand]);
        let allModels = [];
        allMachines && allMachines.filter(machine => machine.range === range).forEach((machine) => {
            allModels.indexOf(machine.model) < 0 && (allModels = [...allModels,machine.model]);
        })
        return allModels;
    } 
}

const getAllNatures = async() => {
    const _allNatures = await Promise.resolve(Object.keys(CotationCatalog));
    let allNatures = [];
    _allNatures.map(
            (nature) => allNatures = [...allNatures,{key:nature,name:Natures.Natures.find(n => n.key === nature).name}]
    )
    return allNatures;
}

const getAllRanges = async(nature,catalogSupplier,brand) => {
    if(nature && catalogSupplier && brand){
        const allMachines = await Promise.resolve(CotationCatalog[nature][catalogSupplier][brand]);
        let allRanges = [];
        allMachines && allMachines.forEach((machine) => {
            allRanges.indexOf(machine.range) < 0 && (allRanges = [...allRanges,machine.range]);
        })
        return allRanges || undefined;
    }
    
}

const getMachine = async(nature,catalogSupplier,brand,model) => {
    const searchedMachine = await Promise.resolve(CotationCatalog[nature][catalogSupplier][brand].find((machine) => machine.model === model));

    return searchedMachine || undefined
}

export default {CotationCatalog,getAllBrands,getAllModels,getAllNatures,getAllRanges,getMachine};