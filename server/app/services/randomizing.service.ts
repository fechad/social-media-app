import { Service } from "typedi";

@Service()
export class RandomizingService {

    constructor(
    ) {
    }

    public  shuffleArray(list: any[], sampleSize?: number) {

        let sample = list.map((v:any) =>({ v, sort: Math.random()*list.length 
                    })).sort((a, b) =>  {
                    if(a.sort < b.sort) return -1;
                    if(a.sort > b.sort) return 1;
                    else return 0;
                    }).map((value:any) => value.v);
        
        if(sampleSize) {
            sample = sample.splice(0, sampleSize);
        }

        return sample;
    };
}