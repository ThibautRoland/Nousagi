interface DogWithMaster {
    master: {
        id: number;
        email: string;
        password: string;
        name: string;
    },
    id: number;
    name: string;
    race: string;
    masterId: number;
}