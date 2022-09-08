export const screenRatio = {

    calculate () {

        console.log('Will calculate');

        let root = document.getElementById('root');

        let width = window.screen.width;
        let height = window.screen.height;
        let normalRatio = 1920 / 1080;
        
        let adjustedRatio = (width / height) / normalRatio;

        if(root) {
            console.log('your width:', width, 'your height:', height);
            console.log('old correct ratio:', normalRatio, 'adjusted ratio:', adjustedRatio)
            root.style.setProperty('--adjustedRatio', `${adjustedRatio}`)
        }
    }

};