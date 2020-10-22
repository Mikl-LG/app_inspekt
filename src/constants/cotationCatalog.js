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
                            range:'AXIONA',
                            model:'45',
                            purchasePriceList : {2004 : 11936, 2005 : 12494, 2006 : 12854,2007 : 13273,2008 : 14088,2009 : 14754,2010 : 14904,2011 : 15974,2012 : 16267,2013 : 16460,2014 : 16768,2015 : 16931,2016 : 17235,2017 : 17471,2018 : 17874,2019 : 18215},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'AXIONA',
                            model:'50',
                            purchasePriceList : {2004 : 12485, 2005 : 13070, 2006 : 13448,2007 : 13894,2008 : 14745,2009 : 15447,2010 : 15597,2011 : 16685,2012 : 16992,2013 : 17189,2014 : 17511,2015 : 17683,2016 : 18000,2017 : 18245,2018 : 18666,2019 : 19020},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'DEXTRA',
                            model:'M49',
                            purchasePriceList : {2012:25254,2013:25807,2014:26416,2015:26620,2016:27000,2017:27474,2018:28089,2019:28565},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'DEXTRA',
                            model:'M54',
                            purchasePriceList : {2012:25978,2013:26635,2014:27262,2015:27475,2016:27873,2017:28365,2018:28998,2019:29487},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'DEXTRA',
                            model:'M54T',
                            purchasePriceList : {2012:27999,2013:28615,2014:29260,2015:29504,2016:29929,2017:30453,2018:30001,2019:31647},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'MAGISTRA',
                            model:'M55',
                            purchasePriceList : {2004:25268,2005:26515,2006:26515,2007:28757,2008:30553,2009:32029,2010:32229,2011:33406,2012:34094,2013:34617,2014:35254,2015:35583,2016:36435,2017:37208,2018:37729,2019:38215},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'MAGISTRA',
                            model:'M60',
                            purchasePriceList : {2004:25885,2005:27163,2006:27163,2007:29459,2008:31300,2009:32821,2010:33021,2011:34207,2012:34913,2013:35445,2014:36100,2015:36438,2016:37308,2017:38099,2018:38638,2019:39133},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'MAGISTRA',
                            model:'M61T',
                            purchasePriceList : {2005:28913,2006:28913,2007:31052,2008:32983,2009:34576,2010:34776,2011:36052,2012:36767,2013:37317,2014:38008,2015:38490,2016:39405,2017:40241,2018:40798,2019:41316},
                            firstYearDevaluation : 30,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'MAGISTRA',
                            model:'M63T',
                            purchasePriceList : {2011:36380,2012:37100,2013:37654,2014:38355,2015:38841,2016:39760,2017:40601,2018:41158,2019:41680},
                            firstYearDevaluation : 30,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'MAGISTRA',
                            model:'68T',
                            purchasePriceList : {2004:28364,2005:29732,2006:29732,2007:31754,2008:33721,2009:35350,2010:35550,2011:36844,2012:37604,2013:38145,2014:38836,2015:38895,2016:39720,2017:40565,2018:40960,2019:41478},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'MAGISTRA',
                            model:'73T',
                            purchasePriceList : {2004:28981,2005:30380,2006:30380,2007:32456,2008:34468,2009:36142,2010:36342,2011:37645,2012:38423,2013:38973,2014:39682,2015:39741,2016:40170,2017:41024,2018:41428,2019:41950},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'MAGISTRA',
                            model:'83T',
                            purchasePriceList : {2005:32738,2006:32738,2007:34940,2008:37105,2009:38905,2010:39105,2011:40588,2012:41393,2013:42015,2014:42706,2015:43395,2016:45435,2017:46406,2018:47026,2019:47602},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        // {
                        //     range:'MALINIA',
                        //     model:'42',
                        //     purchasePriceList : {2004 : 8939, 2005 : 9353, 2006 : 9785,2007 : 11185,2008 : 10731,2009 : 11235,2010 : 11385,2011 : 11798,2012 : 12015,2013 : 12190,2014 : 12390,2015 : 12598,2016 : 12960,2017 : 13218,2018 : 13491,2019 : 13652},
                        //     firstYearDevaluation : 25,
                        //     secondYearDevaluation : 20,
                        //     thirdYearDevaluation : 15,
                        //     fourthYearDevaluation : 12,
                        //     standardYearDevaluation : 10
                        // },
                        {
                            range:'OPTIMA',
                            model:'M51',
                            purchasePriceList : {2005:23057,2006:23057,2007:24437,2008:27164,2009:28161,2010:28665,2011:29734,2012:30350,2013:30783,2014:31366,2015:31605,2016:32205,2017:32834,2018:33553,2019:34071},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'OPTIMA',
                            model:'M56',
                            purchasePriceList : {2005:23705,2006:23705,2007:25139,2008:27911,2009:29257,2010:29457,2011:30535,2012:31169,2013:31611,2014:32212,2015:32460,2016:33078,2017:33725,2018:34462,2019:34993},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'OPTIMA',
                            model:'M57T',
                            purchasePriceList : {2005:24749,2006:24749,2007:26849,2008:29729,2009:31160,2010:31360,2011:32506,2012:33140,2013:33645,2014:34282,2015:34341,2016:34770,2017:35327,2018:36064,2019:36613},
                            firstYearDevaluation : 30,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'OPTIMA',
                            model:'60T',
                            purchasePriceList : {2010:31585,2011:32758,2012:33419,2013:33933,2014:34606,2015:34890,2016:35535,2017:36231,2018:36919,2019:37477},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'PRODIGIA',
                            model:'45',
                            purchasePriceList : {2004:13448,2005:14087,2006:14087,2007:14956,2008:15870,2009:16626,2010:16776,2011:17981,2012:18328,2013:18548,2014:18892,2015:19078,2016:19480,2017:19865,2018:19917,2019:20765},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'PRODIGIA',
                            model:'50',
                            purchasePriceList : {2004:13997,2005:14663,2006:14663,2007:15577,2008:16527,2009:17319,2010:17469,2011:18692,2012:19053,2013:19280,2014:19635,2015:19829,2016:20245,2017:20639,2018:20709,2019:21482},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'TONICA',
                            model:'M50',
                            purchasePriceList : {2004:18968,2005:19868,2006:19868,2007:21287,2008:22853,2009:23938,2010:24138,2011:24901,2012:25427,2013:25779,2014:26416,2015:26628,2016:26985,2017:27605,2018:27847,2019:28045},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                        {
                            range:'TONICA',
                            model:'M55',
                            purchasePriceList : {2004:21749,2005:20516,2006:20516,2007:21989,2008:23600,2009:24468,2010:24930,2011:25702,2012:26246,2013:26607,2014:27262,2015:27483,2016:27858,2017:28496,2018:28756,2019:28954},
                            firstYearDevaluation : 25,
                            secondYearDevaluation : 20,
                            thirdYearDevaluation : 15,
                            fourthYearDevaluation : 12,
                            standardYearDevaluation : 10
                        },
                    ]
            }
        }
}

const damagesCatalog = {

    AXIONA:[
        {id:'123800',name : 'BATI', key:'framework',price:'4156',value:25},
        {id:'101404',name : 'RESERVOIR', key:'tank',price:'1307',value:25},
        {id:'106830',name : 'PIVOT MACHINE', key:'pivot',price:'1926',value:25},
        {id:'106882',name : 'FLECHE', key:'arm',price:'1948',value:25},
        {id:'123819',name : 'BALANCIER', key:'balance',price:'2208',value:25},
        {id:'116615',name : 'VERIN ORIENTATION MACHINE', key:'orientationCylinder',price:'870',value:25},
        {id:'116626',name : 'VERIN GROUPE', key:'groupCylinder',price:'545',value:25},
        {id:'116617',name : 'VERIN BALANCIER', key:'balanceCylinder',price:'542',value:25},
        {id:'116616',name : 'VERIN FLECHE', key:'armCylinder',price:'458',value:25},
        {id:'115458',name : 'POMPE ROTOR', key:'rotorPump',price:'2003',value:25},
        {id:'101551',name : 'MOTEUR', key:'motor',price:'1284',value:25},
        {id:'101540',name : 'MULTIPLICATEUR', key:'multiplicator',price:'915',value:25},
        {id:'117467',name : 'GROUPE SANS MOTEUR', key:'noMotorGroup',price:'4965',value:25},
    ],

        DEXTRA:[
            {id:'128676',name : 'BATI', key:'framework',price:'3309',value:25},
            {id:'128755',name : 'RESERVOIR', key:'tank',price:'1436',value:25},
            {id:'128677',name : 'PIVOT MACHINE', key:'pivot',price:'1315',value:25},
            {id:'128691',name : 'FLECHE', key:'arm',price:'2680',value:25},
            {id:'128705',name : 'BALANCIER', key:'balance',price:'2112',value:25},
            {id:'128706',name : 'TELESCOPIQUE', key:'telescope',price:'1813',value:25},
            {id:'128627',name : 'VERIN ORIENTATION MACHINE', key:'orientationCylinder',price:'816',value:25},
            {id:'116626',name : 'VERIN GROUPE', key:'groupCylinder',price:'557',value:25},
            {id:'116628',name : 'VERIN BALANCIER', key:'balanceCylinder',price:'670',value:25},
            {id:'154061',name : 'VERIN FLECHE', key:'armCylinder',price:'541',value:25},
            {id:'128711',name : 'VERIN TELESCOPIQUE', key:'telescopeCylinder',price:'732',value:25},
            {id:'118368',name : 'POMPE ROTOR', key:'rotorPump',price:'2003',value:25},
            {id:'127043',name : 'MOTEUR', key:'motor',price:'1284',value:25},
            {id:'117467',name : 'GROUPE SANS MOTEUR', key:'noMotorGroup',price:'4965',value:25}
        ],

        MAGISTRA:[
            {id:'116951',name : 'BATI', key:'framework',price:'4156',value:25},
            {id:'118166',name : 'RESERVOIR', key:'tank',price:'1139',value:25},
            {id:'116906',name : 'PIVOT MACHINE', key:'pivot',price:'2443',value:25},
            {id:'113660',name : 'FLECHE', key:'arm',price:'2739',value:25},
            {id:'118816',name : 'BALANCIER', key:'balance',price:'2366',value:25},
            {id:'118807',name : 'TELESCOPIQUE', key:'telescope',price:'1978',value:25},
            {id:'116954',name : 'VERIN ORIENTATION MACHINE', key:'orientationCylinder',price:'870',value:25},
            {id:'116993',name : 'VERIN GROUPE', key:'groupCylinder',price:'545',value:25},
            {id:'107656',name : 'VERIN BALANCIER', key:'balanceCylinder',price:'702',value:25},
            {id:'107655',name : 'VERIN FLECHE (2)', key:'armCylinder',price:'2012',value:25},
            {id:'107657',name : 'VERIN TELESCOPIQUE', key:'telescopeCylinder',price:'731',value:25},
            {id:'118366',name : 'POMPE ROTOR', key:'rotorPump',price:'2033',value:25},
            {id:'101551',name : 'MOTEUR', key:'motor',price:'1284',value:25},
            {id:'107665',name : 'MULTIPLICATEUR', key:'multiplicator',price:'1384',value:25},
            {id:'107467',name : 'GROUPE SANS MOTEUR', key:'noMotorGroup',price:'4965',value:25},
        ],

        OPTIMA:[
            {id:'116951',name : 'BATI', key:'framework',price:'4156',value:25},
            {id:'116963',name : 'RESERVOIR', key:'tank',price:'1307',value:25},
            {id:'117838',name : 'PIVOT MACHINE', key:'pivot',price:'1926',value:25},
            {id:'117846',name : 'FLECHE', key:'arm',price:'1948',value:25},
            {id:'117844',name : 'BALANCIER', key:'balance',price:'2208',value:25},
            {id:'117849',name : 'TELESCOPIQUE', key:'telescope',price:'1815',value:25},
            {id:'116954',name : 'VERIN ORIENTATION MACHINE', key:'orientationCylinder',price:'870',value:25},
            {id:'116993',name : 'VERIN GROUPE', key:'groupCylinder',price:'545',value:25},
            {id:'118336',name : 'VERIN BALANCIER', key:'balanceCylinder',price:'542',value:25},
            {id:'116992',name : 'VERIN FLECHE', key:'armCylinder',price:'458',value:25},
            {id:'116628',name : 'VERIN TELESCOPIQUE', key:'telescopeCylinder',price:'669',value:25},
            {id:'118368',name : 'POMPE ROTOR', key:'rotorPump',price:'2003',value:25},
            {id:'101551',name : 'MOTEUR', key:'motor',price:'1284',value:25},
            {id:'113056',name : 'MULTIPLICATEUR', key:'multiplicator',price:'915',value:25},
            {id:'117467',name : 'GROUPE SANS MOTEUR', key:'noMotorGroup',price:'4965',value:25},
        ],

        PRODIGIA:[
            {id:'123800',name : 'BATI', key:'framework',price:'4156',value:25},
            {id:'101404',name : 'RESERVOIR', key:'tank',price:'1307',value:25},
            {id:'106830',name : 'PIVOT MACHINE', key:'pivot',price:'1926',value:25},
            {id:'106882',name : 'FLECHE', key:'arm',price:'1948',value:25},
            {id:'123819',name : 'BALANCIER', key:'balance',price:'2208',value:25},
            {id:'116615',name : 'VERIN ORIENTATION MACHINE', key:'orientationCylinder',price:'870',value:25},
            {id:'116626',name : 'VERIN GROUPE', key:'groupCylinder',price:'545',value:25},
            {id:'116617',name : 'VERIN BALANCIER', key:'balanceCylinder',price:'542',value:25},
            {id:'116616',name : 'VERIN FLECHE', key:'armCylinder',price:'458',value:25},
            {id:'115458',name : 'POMPE ROTOR', key:'rotorPump',price:'2003',value:25},
            {id:'101551',name : 'MOTEUR', key:'motor',price:'1284',value:25},
            {id:'101540',name : 'MULTIPLICATEUR', key:'multiplicator',price:'915',value:25},
            {id:'117467',name : 'GROUPE SANS MOTEUR', key:'noMotorGroup',price:'4965',value:25},
        ],

        TONICA:[
            {id:'128676',name : 'BATI', key:'framework',price:'3309',value:25},
            {id:'128755',name : 'RESERVOIR', key:'tank',price:'1436',value:25},
            {id:'128677',name : 'PIVOT MACHINE', key:'pivot',price:'1315',value:25},
            {id:'128691',name : 'FLECHE', key:'arm',price:'2680',value:25},
            {id:'128705',name : 'BALANCIER', key:'balance',price:'2112',value:25},
            {id:'128706',name : 'TELESCOPIQUE', key:'telescope',price:'1813',value:25},
            {id:'128627',name : 'VERIN ORIENTATION MACHINE', key:'orientationCylinder',price:'816',value:25},
            {id:'116626',name : 'VERIN GROUPE', key:'groupCylinder',price:'557',value:25},
            {id:'116628',name : 'VERIN BALANCIER', key:'balanceCylinder',price:'670',value:25},
            {id:'154061',name : 'VERIN FLECHE', key:'armCylinder',price:'541',value:25},
            {id:'128711',name : 'VERIN TELESCOPIQUE', key:'telescopeCylinder',price:'732',value:25},
            {id:'118368',name : 'POMPE ROTOR', key:'rotorPump',price:'2003',value:25},
            {id:'127043',name : 'MOTEUR', key:'motor',price:'1284',value:25},
            {id:'117467',name : 'GROUPE SANS MOTEUR', key:'noMotorGroup',price:'4965',value:25}
        ],
}

// const getAllBrands = async(nature) => {
//     const allBrands = await Promise.resolve(brands[nature]);
//     return allBrands;
// }

const getDamages = async(range) => {
    if(range){
        const allDamages = await Promise.resolve(damagesCatalog[range]);
        return allDamages;
    } 
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

const getAllRanges = async(nature,catalogSupplier,brand) => {

    if(nature && catalogSupplier && brand){
        const allMachines = CotationCatalog[nature] && CotationCatalog[nature][catalogSupplier] && await Promise.resolve(CotationCatalog[nature][catalogSupplier][brand]);

        let allRanges = await new Promise((resolve,reject) => {
            let _allRanges = [];
            allMachines 
            && allMachines.forEach((machine) => {
                _allRanges.indexOf(machine.range) < 0 && (_allRanges = [..._allRanges,machine.range]);
            })
            resolve(_allRanges);
        })
        return allRanges;
    }
}

const getMachine = async(nature,catalogSupplier,brand,range,model) => {
    const searchedMachine = await Promise.resolve(CotationCatalog[nature][catalogSupplier][brand].find((machine) => machine.model === model && machine.range === range));
    searchedMachine.damages = damagesCatalog[range];

    return searchedMachine || undefined
}

export default {CotationCatalog,getDamages,getAllModels,getAllRanges,getMachine};