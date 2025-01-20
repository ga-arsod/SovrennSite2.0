export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID; 

export const initGA = () => {
    if (typeof window === 'undefined') {
        return;
    }
    if (!window.dataLayer) {
        window.dataLayer = [];
    }
    function gtag() {
        window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);
};

export const logPageView = () => {
    if (typeof window === 'undefined') {
        return;
    }
    initGA();
};