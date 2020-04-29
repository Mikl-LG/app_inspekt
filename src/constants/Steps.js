import formsCatalog from "./FormsCatalog";

export default {
    // /!\ property 'fields' MUST be defined for step 1
    1 : {
        title: 'Votre Client',
        key: 'customer',
        fields: [
            {
                title: 'Titre',
                property: 'title',
                data: formsCatalog.ownerTitles  // select type
            },
            {
                title: 'Nom du client',
                property: 'name',
                // multiline: true
            },
            {
                title: 'Ville',
                property: 'city'
            }
        ]
    },

    // /!\ property 'fields' MUST NOT be defined for step 2 to 4 (defined by didUpdate from Natures steps definition rebuild process from FormsCatalog objects)
    2 : {
        title: 'Identification',
        key: 'machine'
       
    },
    3 : {
        title: 'Caractéristiques',
        key: 'machineFeatures'
    },
    4 : {
        title: 'Photos Commerciales',
        key: 'pictures'
    },

    // /!\ property 'fields' MUST be defined for step 5 
    5 : {
        title: 'Points Particuliers',
        key: 'particularities',
        fields: [
            {
                title: 'Date de disponibilité',
                property: 'availableDate',
                date: true
            },
            {
                title: 'Commentaires',
                property: 'comments',
                multiline: true
            },
            {
                title: 'Points',
                property: 'points',
                commentedPictures: true          // /!\ :    commentedPictures !== picture
            },
            {
                title: 'Signature',
                property: 'signature',
                signature: true
            }
        ],
    }
}