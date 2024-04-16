import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const catList = [
        "Abyssinian", "Aegean", "American Bobtail", "American Shorthair",
        "Aphrodite Giant", "Arabian Mau", "Asian", "Australian Mist", "Bambino", "Bengal Cats",
        "Birman", "Bombay", "Brazilian Shorthair", "British Longhair", "British Shorthair", "Burmese",
        "Burmilla", "California Spangled", "Chantilly-Tiffany", "Chausie", "Colorpoint Shorthair",
        "Cornish Rex", "Cyprus", "Devon Rex", "Donskoy", "European Shorthair", "Foldex", "German Rex",
        "Highlander", "Japanese Bobtail", "Javanese", "Khao Manee", "Kurilian Bobtail", "Lykoi",
        "Maine Coon", "Manx", "Mekong Bobtail", "Nebelung", "Oriental Bicolor", "Persian", "Peterbald",
        "Pixie-Bob", "Ragdoll Cats", "Russian Blue", "Savannah", "Scottish Fold", "Serengeti",
        "Siamese Cat", "Siberian", "Singapura", "Snowshoe", "Sokoke", "Somali", "Sphynx",
        "Tonkinese", "Toyger", "Turkish Angora", "Turkish Van", "Ukrainian Levkoy", "York Chocolate"
];

const dogList = [
    'Affenpinscher','Afghan Hound','Airedale Terrier','Akita','Alaskan Malamute','American Bulldog',
    'American English Coonhound','American Eskimo Dog','American Foxhound','American Hairless Terrier',
    'American Leopard Hound','American Staffordshire Terrier','American Water Spaniel',
    'Anatolian Shepherd Dog','Appenzeller Sennenhund','Australian Cattle Dog','Australian Kelpie',
    'Australian Shepherd','Australian Stumpy Tail Cattle Dog','Australian Terrier','Azawakh',
    'Barbet','Basenji','Basset Fauve de Bretagne','Basset Hound','Bavarian Mountain Scent Hound',
    'Beagle','Bearded Collie','Beauceron','Bedlington Terrier','Belgian Laekenois','Belgian Malinois',
    'Belgian Sheepdog','Belgian Tervuren','Bergamasco Sheepdog','Berger Picard','Bernese Mountain Dog',
    'Bichon Frise','Biewer Terrier','Black and Tan Coonhound','Black Russian Terrier',
    'Bloodhound','Bluetick Coonhound','Boerboel','Bohemian Shepherd','Bolognese','Border Collie',
    'Border Terrier','Borzoi','Boston Terrier','Bouvier des Flandres','Boxer','Boykin Spaniel',
    'Bracco Italiano','Braque du Bourbonnais','Braque Francais Pyrenean','Briard','Brittany',
    'Broholmer','Brussels Griffon','Bull Terrier','Bulldog','Bullmastiff','Cairn Terrier','Canaan Dog',
    'Cane Corso','Cardigan Welsh Corgi','Carolina Dog','Catahoula Leopard Dog','Caucasian Shepherd Dog',
    'Cavalier King Charles Spaniel','Central Asian Shepherd Dog','Cesky Terrier','Chesapeake Bay Retriever',
    'Chihuahua','Chinese Crested','Chinese Shar-Pei','Chinook','Chow Chow','Cirneco dellâ€™Etna','Clumber Spaniel',
    'Cocker Spaniel','Collie','Coton de Tulear','Croatian Sheepdog','Curly-Coated Retriever',
    'Czechoslovakian Vlcak','Dachshund','Dalmatian','Dandie Dinmont Terrier','Danish-Swedish Farmdog',
    'Deutscher Wachtelhund','Doberman Pinscher','Dogo Argentino','Dogue de Bordeaux','Drentsche Patrijshond',
    'Drever','Dutch Shepherd','English Cocker Spaniel','English Foxhound','English Setter','English Springer Spaniel',
    'English Toy Spaniel','Entlebucher Mountain Dog','Estrela Mountain Dog','Eurasier','Field Spaniel',
    'Finnish Lapphund','Finnish Spitz','Flat-Coated Retriever','French Bulldog','French Spaniel','German Longhaired Pointer',
    'German Pinscher','German Shepherd Dog','German Shorthaired Pointer','German Spitz',
    'German Wirehaired Pointer','Giant Schnauzer','Glen of Imaal Terrier','Golden Retriever','Gordon Setter',
    'Grand Basset Griffon VendÃ©en','Great Dane','Great Pyrenees','Greater Swiss Mountain Dog','Greyhound','Hamiltonstovare',
    'Hanoverian Scenthound','Harrier','Havanese','Hokkaido','Hovawart','Ibizan Hound','Icelandic Sheepdog','Irish Red and White Setter',
    'Irish Setter','Irish Terrier','Irish Water Spaniel','Irish Wolfhound','Italian Greyhound','Jagdterrier',
    'Japanese Chin','Japanese Spitz','Jindo','Kai Ken','Karelian Bear Dog','Keeshond','Kerry Blue Terrier',
    'Kishu Ken','Komondor','Kromfohrlander','Kuvasz','Labrador Retriever','Lagotto Romagnolo','Lakeland Terrier',
    'Lancashire Heeler','Lapponian Herder','Leonberger','Lhasa Apso','LÃ¶wchen','Maltese','Manchester Terrier (Standard)','Manchester Terrier (Toy)',
    'Mastiff','Miniature American Shepherd','Miniature Bull Terrier','Miniature Pinscher','Miniature Schnauzer',
    'Mountain Cur','Mudi','Neapolitan Mastiff','Nederlandse Kooikerhondje','Newfoundland','Norfolk Terrier',
    'Norrbottenspets','Norwegian Buhund','Norwegian Elkhound','Norwegian Lundehund','Norwich Terrier',
    'Nova Scotia Duck Tolling Retriever','Old English Sheepdog','Otterhound','Papillon',
    'Parson Russell Terrier','Pekingese','Pembroke Welsh Corgi','Perro de Presa Canario','Peruvian Inca Orchid',
    'Petit Basset Griffon VendÃ©en','Pharaoh Hound','Plott Hound','Pointer','Polish Lowland Sheepdog','Pomeranian',
    'Poodle (Miniature)','Poodle (Standard)','Poodle (Toy)','Porcelaine','Portuguese Podengo','Portuguese Podengo Pequeno',
    'Portuguese Pointer','Portuguese Sheepdog','Portuguese Water Dog','Pudelpointer','Pug','Puli','Pumi','Pyrenean Mastiff',
    'Pyrenean Shepherd','Rafeiro do Alentejo','Rat Terrier','Redbone Coonhound','Rhodesian Ridgeback','Romanian Mioritic Shepherd Dog',
    'Rottweiler','Russell Terrier','Russian Toy','Russian Tsvetnaya Bolonka','Saint Bernard','Saluki','Samoyed',
    'Schapendoes','Schipperke','Scottish Deerhound','Scottish Terrier','Sealyham Terrier','Segugio Italiano',
    'Shetland Sheepdog','Shiba Inu','Shih Tzu','Shikoku','Siberian Husky','Silky Terrier','Skye Terrier','Sloughi',
    'Slovakian Wirehaired Pointer','Slovensky Cuvac','Slovensky Kopov','Small Munsterlander Pointer',
    'Smooth Fox Terrier','Soft Coated Wheaten Terrier','Spanish Mastiff','Spanish Water Dog','Spinone Italiano',
    'Stabyhoun','Staffordshire Bull Terrier','Standard Schnauzer','Sussex Spaniel','Swedish Lapphund','Swedish Vallhund',
    'Taiwan Dog','Teddy Roosevelt Terrier','Thai Ridgeback','Tibetan Mastiff','Tibetan Spaniel','Tibetan Terrier',
    'Tornjak','Tosa','Toy Fox Terrier','Transylvanian Hound','Treeing Tennessee Brindle','Treeing Walker Coonhound','Vizsla',
    'Weimaraner','Welsh Springer Spaniel','Welsh Terrier','West Highland White Terrier','Wetterhoun','Whippet','Wire Fox Terrier',
    'Wirehaired Pointing Griffon','Wirehaired Vizsla','Working Kelpie','Xoloitzcuintli','Yakutian Laika','Yorkshire Terrier'
];


const AddPetForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [adoptionFee, setAdoptionFee] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [breedList, setBreedList] = useState([]);

    const handleSpeciesChange = (e) => {
        setSpecies(e.target.value);
        if (e.target.value === 'cat') {
            setBreedList(catList);
        } else if (e.target.value === 'dog') {
            setBreedList(dogList);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPet = {
            name,
            species,
            breed,
            description,
            adoption_fee: adoptionFee,
            age,
            gender,
        };

        onAdd(newPet);

        setName('');
        setSpecies('');
        setBreed('');
        setDescription('');
        setAdoptionFee('');
        setAge('');
        setGender('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom>Add Pet</Typography>
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Species</InputLabel>
                <Select
                    value={species}
                    onChange={handleSpeciesChange}
                    label="Species"
                >
                    <MenuItem value="dog">Dog</MenuItem>
                    <MenuItem value="cat">Cat</MenuItem>
                </Select>
            </FormControl>
            {species && (
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Breed</InputLabel>
                    <Select
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        label="Breed"
                    >
                        {breedList.map((breedItem) => (
                            <MenuItem key={breedItem} value={breedItem}>{breedItem}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
            <TextField
                label="Age"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Gender</InputLabel>
                <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    label="Gender"
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
                label="Adoption Fee"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={adoptionFee}
                onChange={(e) => setAdoptionFee(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
                Add Pet
            </Button>
        </form>
    );
};

export default AddPetForm;