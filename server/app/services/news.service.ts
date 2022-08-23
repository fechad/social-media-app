import { Service } from "typedi";

@Service()
export class NewsService {

    //private newsAPIKey = '5b227cdd668347119cb253da9ae1deae';
    private backupNewsAPIKey = '5f0ec7a11fba4aedb2f9a99c6ed47ac9';

    public categories = 'business;entertainment;general;health;science;sports;technology'

    private business: any[] = [];
    private localBusiness: any[] = [];
    private entertainment: any[] = [];
    private localEntertainment: any[] = [];
    private general: any[] = [];
    private localGeneral: any[] = [];
    private health: any[] = [];
    private localHealth: any[] = [];
    private science: any[] = [];
    private localScience: any[] = [];
    private sports: any[] = [];
    private localSports: any[] = [];
    private technology: any[] = [];
    private localTechnology: any[] = [];

    private axios = require('axios').default;

    constructor(
    ) {
        this.init();
        this.startInterval();
    }

    private init() {
        this.categories.split(';').forEach(async category => {
            if(category) await this.fetchCategoryArticles(category, false);
        });
        this.categories.split(';').forEach(async category => {
            if(category) await this.fetchCategoryArticles(category, true);
        });
    }

    private startInterval() {
        setInterval(() => {
            this.categories.split(';').forEach(async category => {
                if(category) await this.fetchCategoryArticles(category, false);
            });
            this.categories.split(';').forEach(async category => {
                if(category) await this.fetchCategoryArticles(category, true);
            });
        }, 14400000)
    }

    private  getShuffledArray(list: any[]) {

        let sample = list.map((v:any) =>({ v, sort: Math.random()*list.length 
                    })).sort((a, b) =>  {
                    if(a.sort < b.sort) return -1;
                    if(a.sort > b.sort) return 1;
                    else return 0;
                    }).map((value:any) => value.v).splice(0, 20);

        return sample;
    };

    public async fetchCategoryArticles(category: string ,local: boolean) {

        let articleList:any[] = [];
        let url = 'https://newsapi.org/v2/top-headlines?' +
                `category=${category}` +
                `${local ? '&country=ca' : ''}` +
                '&language=en' +
                '&apikey=' + this.backupNewsAPIKey;

        console.log(url);
        
        await this.axios
            .get(url)
            .then(function (data: any) {
            console.log(`statusCode: ${data.status}`);
            //console.log(data.data);
            data.data.articles.forEach((article:any) => articleList.push(article));
                //console.log(articleList)
            })
            .catch((error: Error) => {
                console.error(error.message);
            });
            
        
        if(local) {
            if(category.toLowerCase() === 'business') this.localBusiness= articleList;
            else if(category.toLowerCase() === 'entertainment') this.localEntertainment = articleList;
            else if(category.toLowerCase() === 'general') this.localGeneral = articleList;
            else if(category.toLowerCase() === 'health') this.localHealth = articleList;
            else if(category.toLowerCase() === 'science') this.localScience = articleList;
            else if(category.toLowerCase() === 'sports') this.localSports = articleList;
            else if(category.toLowerCase() === 'technology') this.localTechnology = articleList;
        }
        else {
            if(category.toLowerCase() === 'business') this.business= articleList;
            else if(category.toLowerCase() === 'entertainment') this.entertainment = articleList;
            else if(category.toLowerCase() === 'general') this.general = articleList;
            else if(category.toLowerCase() === 'health') this.health = articleList;
            else if(category.toLowerCase() === 'science') this.science = articleList;
            else if(category.toLowerCase() === 'sports') this.sports = articleList;
            else if(category.toLowerCase() === 'technology') this.technology = articleList;
        }
    };


    public getCategoryArticles(category: string) {
        
        if(category.toLowerCase() === 'business') return this.business;
        else if(category.toLowerCase() === 'entertainment') return this.entertainment;
        else if(category.toLowerCase() === 'general') return this.general;
        else if(category.toLowerCase() === 'health') return this.health;
        else if(category.toLowerCase() === 'science') return this.science;
        else if(category.toLowerCase() === 'sports') return this.sports;
        else return this.technology;
    }

    public getLocalCategoryArticles(category: string) {

        if(category.toLowerCase() === 'business') return this.localBusiness;
        else if(category.toLowerCase() === 'entertainment') return  this.localEntertainment;
        else if(category.toLowerCase() === 'general') return  this.localGeneral;
        else if(category.toLowerCase() === 'health') return  this.localHealth;
        else if(category.toLowerCase() === 'science') return  this.localScience;
        else if(category.toLowerCase() === 'sports') return  this.localSports;
        else return  this.localTechnology;
    }


    public getArticles(categories: string, local: string) {

        let articleList:any[] = [];
        let arrayList = categories.split(';');
        console.log(categories);
        arrayList.forEach(category => {
            if(local) {
                this.getLocalCategoryArticles(category).forEach(article => articleList.push(article));
            } else {
                this.getCategoryArticles(category).forEach(article => articleList.push(article));
            }
        })

        if(articleList.length > 20) return this.getShuffledArray(articleList);
        else return articleList;
    };
}