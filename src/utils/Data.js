export const androidAppLink="https://play.google.com/store/apps/details?id=com.sovrenn&pli=1"
export const iosAppLink="https://apps.apple.com/us/app/sovrenn/id6450649929"
export const planData = [
  {
    planName: "Sovrenn Times",
    price: "4000",
    validity: "1 year",
    planDescription: "Full access of Sovrenn Times",
    popular: false,
    features: [
      {
        accessibility: true,
        description: "Access to daily Sovrenn Times",
      },
      {

        accessibility: false,
        description: "Community Support",
      },
    ],
  },
  {
    planName: "Trial Plan",
    price: "400",
    validity: "2 months",
    planDescription: "Try out Sovrenn for 2 months.",
    applicable: "*(Applicable only once)",
    popular: false,
    features: [
      {
        accessibility: true,
        description: "Access to all the features for 2 months",
      },
      {
        accessibility: false,
        description: "Community Support",
      },
    ],
  },
  {
    planName: "Full Access Plan",
    price: "5000",
    validity: "1 year",
    planDescription: "Get everything unlocked for a year.",

    popular: true,
    features: [
      {
        accessibility: true,
        description: "Access to all the features for 2 months",
      },
      {
        accessibility: true,
        description: "Community Support",
      },
    ],
  },
];

export const foundersArray = [
  {
    imagePath: "/aditya.png",
    name: "Aditya Joshi",
    linkedin: "https://in.linkedin.com/in/adityajoshi1",
    twitter: "https://twitter.com/aditya_joshi12",
    position: "Co-founder & CEO",
    description:
      "Aditya Joshi is the co-founder and CEO at Sovrenn. Prior to starting up, he was a Senior Vice President at Stanza Living where he headed Growth Strategy. Prior to Stanza, he was Chief of Staff and Online Business Head at Lenskart. He has completed his MBA from IIM Calcutta and his B.Tech. from IIT Delhi where he was an Institute Silver Medallist. He believes in the values of compassion, honesty, perseverance and ambition.",
  },
  {
    imagePath: "/akriti.png",
    name: "Akriti Swaroop",
    linkedin: "https://www.linkedin.com/in/akritiswaroop/",
    twitter: "https://twitter.com/SwaroopAkriti",
    position: "Co-founder & COO",
    description:
      "Akriti Swaroop, CFA, is the co-founder and COO at Sovrenn. She has close to seven years of experience in research between Credit Suisse and Deutsche Bank. She is an alumnus of IIM Calcutta and IIT Kharagpur. She holds tightly the values of empathy, honesty and diligence.",
  },
];

export const customerArray = [
  {
    description:
      "I've been using Sovrenn for several years now, and I couldn't be happier with their services. The mobile banking app they provide is an absolute game-changer. It's incredibly user-friendly and has made managing my finances a breeze.",
    imagePath: "/images.jpg",
    name: "Jerry Helfer",
    date: "24  Oct, 2023",
  },
  {
    description:
      "I've been using Sovrenn for several years now, and I couldn't be happier with their services. The mobile banking app they provide is an absolute game-changer. It's incredibly user-friendly and has made managing my finances a breeze.",
    imagePath: "/images.jpg",
    name: "Jerry Helfer",
    date: "24  Oct, 2023",
  },
  {
    description:
      "I've been using Sovrenn for several years now, and I couldn't be happier with their services. The mobile banking app they provide is an absolute game-changer. It's incredibly user-friendly and has made managing my finances a breeze.",
    imagePath: "/images.jpg",
    name: "Jerry Helfer",
    date: "24  Oct, 2023",
  },
  {
    description:
      "I've been using Sovrenn for several years now, and I couldn't be happier with their services. The mobile banking app they provide is an absolute game-changer. It's incredibly user-friendly and has made managing my finances a breeze.",
    imagePath: "/images.jpg",
    name: "Jerry Helfer",
    date: "24  Oct, 2023",
  },
];

export const LiveSessionInfoArray = [
  {
    h1: "Identifying Potential Multibaggers",
    listItems: [
      "Identifying if a stock is good with high probability & Exit Strategy.",
      "How to start Microcap investing.",
      "Understanding the basics of Valuation.",
      "Basics of Special situations such as rights, preferential allotment etc, Bulk deals and SHP.",
      "Check list for finding a great stock.",
      "Understanding importance of information and basic market psychology.",
    ],
  },
  {
    h1: "Price Targets, Valuation and Float Analysis",
    listItems: [
      "Calculate a fair price of stock after 1 year.",

      "Understand retail float and its role in investing.",

      "Calculate PE of SME and Non-SME stocks.",
      "Identifying if a stock is undervalued, overvalued and fairly valued.",
      "Understand in-depth special situations such as preferential, large order and capacity expansion.",
    ],
  },
];

export const expertDataArray = {
  foundersH1: "Meet Our",
  expertH1: "Meet the",
  foundersH2: "Founders",
  expertH2: "Expert",
  foundersDescription: "Get to Know the Minds Behind Sovrenn",
  expertDescription: "Gain a learning experience from our expert.",
};

export const educationFaqArray = [
  {
    question: "When will I receive the live zoom call link?",
    answer:
      'Lorem Ipsum, sometimes referred to as lipsum", is the placeholder text used in design when creating content.',
  },
  {
    question: "Can beginners join this session?",
    answer:
      'Lorem Ipsum, sometimes referred to as "lipsum", is the placeholder text used in design when creating content.',
  },
  {
    question: "Can beginners join this session?",
    answer:
      'Lorem Ipsum, sometimes referred to as "lipsum", is the placeholder text used in design when creating content.',
  },
];

export const faqDescription = {
  home: "Everything you need to know about the product and billing.",
  education: "Everything you need to know about the session booking.",
};

export const bucketFormConfig = [
  {
    type: "text",
    label: "Title of Bucket list",
    name: "title",
    placeholder: "Enter a name of the bucket list",
  },
  {
    type: "text",
    label: "Description of bucket list",
    name: "description",
    placeholder: "Add description of your bucket list",
  },
  {
    type: "select",
    label: "Select Bucket",
    name: "bucket_list",
    options: [
      { value: "rightIssuance", label: "Right Issuance" },
      { value: "consumption", label: "Consumption" },
      { value: "infrastructure", label: "Infrastructure" },
      { value: "microcap", label: "Strategic Microcap Corner" },
    ],
  },
];

export const navItems = [
  {
    name: "Sign Up",
    link: "/signup",
    description:""
  },
  {
    name: "Login",
    link: "/login",
    description:""
  },
  {
    name: "Learn",
    link: "/education",
     description:"Detailed information about upcoming IPOs."
  },
  {
    name: "Discovery",
    link: "/discovery",
    description:"Get thematic buckets on themes like Solar, Railways, Defence, IT, Consumption, Electrification, etc."
  },
  {
    name: "Times",
    link: "/times",
    description:"Get daily newsletter covering updates on important events in smallcap and microcap space."
  },
  {
    name: "Prime",
    link: "/prime",
    description:"Read detailed articles on promising smallcap and microcap companies."
  },
 
  {
    name: "IPO",
    link: "/ipo-zone",
    description:"Detailed information about upcoming IPOs."
  },
  {
    name: "Knowledge",
    link: "/knowledge",
    description:"Detailed information about upcoming IPOs."
  },
  {
    name: "Self Help",
    link: "/self-help",
    description:"Detailed information about upcoming IPOs."
  },
  
  {
    name: "Pulse",
    link: "/pulse",
  },
 
  {
    name: "Pricing",
    link: "/pricing",
    description:""
  },
];

export const landingPageArray = [
  {
    title: "Sovrenn Education",
    description:
      "Learn long-term investing in simple, easy to understand language (English and Hindi)",
  },
  {
    title: "Sovrenn Times",
    description:
      "Get daily newsletter covering updates on important events in smallcap and microcap space - large orders received, strategic acquisitions, capacity expansion, fund raise, etc.",
  },
  {
    title: "Sovrenn Prime",
    description:
      "Read detailed articles on promising smallcap and microcap companies.",
  },
  {
    title: "Sovrenn Discovery",
    description:
      "Get thematic buckets on themes like Solar, Railways, Defence, IT, Consumption, Electrification, etc.",
  },
  {
    title: "Sovrenn Pulse",
    description:
      "Create your own watchlist of stocks and get live company updates on important developments.",
  },
];
export const fieldOptions = {
  largeOrder: {
    companyData: [
      {
        label: "Company Name",
        type: "text",
        name: "company_name",
        placeholder: "Search for a company",
      },
      {
        label: "Market Cap (In Crores)",
        type: "number",
        name: "current_market_cap",
        placeholder: "Enter only digits",
      },
      {
        label: "Share Price",
        type: "number",
        name: "current_share_price",
        placeholder: "Enter only digits",
      },
      {
        label: "TTM Sales (In Crores)",
        type: "number",
        name: "ttm_sales",
        placeholder: "Enter only digits",
      },
      {
        label: "TTM Net Profit (In Crores)",
        type: "number",
        name: "ttm_net_profit",
        placeholder: "Enter only digits",
      },
    ],
    orderData: [
      {
        label: "Current Orderbook (In Crores)",
        type: "number",
        name: "current_orderbook",
        placeholder: "Enter only digits",
      },
      {
        label: "Timeline (In Months)",
        type: "number",
        name: "timeline",
        placeholder: "Enter only digits",
      },
      {
        label: "Fair PE (X)",
        type: "number",
        name:  "fair_pe",
        placeholder: "Enter only digits",
      },
    ],
  },
  preferential: {
    companyData: [
      {
        label: "Company Name",
        type: "text",
        name:"company_name",
        placeholder: "Search for a company",
      },
      {
        label: "Market Cap (In Crores)",
        type: "number",
        name: "current_market_cap",
        placeholder: "Enter only digits",
      },
      {
        label: "Share Price",
        type: "number",
        name:"current_share_price",
        placeholder: "Enter only digits",
      },
      {
        label: "TTM Sales (In Crores)",
        type: "number",
        name: "ttm_sales",
        placeholder: "Enter only digits",
      },
      {
        label: "TTM Net Profit (In Crores)",
        type: "number",
        name:" ttm_net_profit",
        placeholder: "Enter only digits",
      },
      {
        label: "Fixed Asset Turnover (X)",
        type: "number",
        name:"fixed_asset_turnover",
        placeholder: "Enter only digits",
      },
    ],
    orderData: [
      {
        label: "Preferential Number of Shares/Warrants",
        type: "number",
        name: "pref_no_of_shares",
        placeholder: "Enter only digits",
      },
      {
        label: "Preferential Price",
        name: "preferential_price",
        type: "number",
        placeholder: "Enter only digits",
      },
      {
        label:
          "Percent Utilization of Raised Capital Towards Creation of Revenue Generating Asset (%)",
        name: "utilization_of_raised_capital",
        type: "number",
        placeholder: "Enter only digits",
      },
      {
        label: "Fair PE (X)",
        type: "number",
        name:"fair_pe",
        placeholder: "Enter only digits",
       
      },
    ],
  },
  uptrend: {
    companyData: [
      {
        label: "Company Name",
        type: "text",
        name: "company_name",
       
        placeholder: "Search for a company",
      },
      {
        label: "Market Cap (In Crores)",
        type: "number",
        name: "current_market_cap",
        placeholder: "Enter only digits",
      },
      {
        label: "Share Price",
        type: "number",
        name: "current_share_price",
        placeholder: "Enter only digits",
      },
      {
        label: "TTM Sales (In Crores)",
        type: "number",
        name: "ttm_sales",
        placeholder: "Enter only digits",
      },
      {
        label: "TTM Net Profit (In Crores)",
        type: "number",
        name: "ttm_net_profit",
        placeholder: "Enter only digits",
      },
    ],
    orderData: [
      {
        label: "Last Quarter Profit (In Crores)",
        type: "number",
        name: "current_orderbook",
        placeholder: "Enter only digits",
      },
    
      {
        label: "Fair PE (X)",
        type: "number",
        name: "fair_pe",
        placeholder: "Enter only digits",
      },
    ],
  },
  capacityExpansion: {
    companyData: [
      {
        label: "Company Name",
        type: "text",
        name: "company_name",
        placeholder: "Search for a company",
      },
      {
        label: "Market Cap (In Crores)",
        type: "number",
        name: "current_market_cap",
        placeholder: "Enter only digits",
      },
      {
        label: "Share Price",
        type: "number",
        name: "current_share_price",
        placeholder: "Enter only digits",
      },
      {
        label: "TTM Sales (In Crores)",
        type: "number",
        name: "ttm_sales",
        placeholder: "Enter only digits",
      },
      {
        label: "TTM Net Profit (In Crores)",
        type: "number",
        name: "ttm_net_profit",
        placeholder: "Enter only digits",
      },
    ],
    orderData: [
      {
        label: "Percent Increase In Capacity (%)",
        type: "number",
        name: "percent_increase_in_capacity",
        placeholder: "Enter only digits",
      },

      {
        label: "Fair PE (X)",
        type: "number",
        name: "fair_pe",
        placeholder: "Enter only digits",
      },
    ],
  },
};

export const primeArticleDisclaimer =
  "This document is created for educational and informational purposes only and should not be construed as a Buy/Sell recommendation, investment advice or a research report. Although the document accurately reflects the personal views of the authors,there may be manual human errors in the document. The authors may also have equity shares in the companies mentioned in this report. Investor is advised to consult his/her investment advisor and undertake further due diligence before making any investment decision in the companies mentioned. Authors are not liable for any financial gains or losses due to investments made as per the information written in this document.";

  export const selfHelpDisclaimer="Self-help tool is a simplistic model to predict potential future share price. It is important to note that if used incorrectly, it may lead to erratic results. Further, investment decisions should not be made solely on the basis of this model as it is only to serve as a guide and hence must be supplemented with detailed fundamental research and analysis."
 export const sovreenOfferArray = [
    {
      imagePath: "/pulse.png",
      Info: {
        heading: "Sovrenn Pulse",
        listItems: [ "Create your personalized watchlist of stocks for easy tracking",  
           "Get real-time company updates on important developments",  
          "Stay informed with live alerts on the companies you follow"]
      },
      button: {
        link:"/pulse",
        first: "Explore This Feature Now",
        second: "Buy Full Access @ ₹5000/yr",
      },
    },
    {
      imagePath: "/discoveryCarousel.png",
      Info: {
        heading: "Sovrenn Discovery",
        listItems: ["Explore thematic buckets on key sectors like Solar, Railways, Defence, IT, Consumption, Electrification, and more",  
          "Dive into curated themes to discover sector-specific opportunities",  
          "Stay ahead with insights into trending industries and their growth drivers"
          ],
      },
      button: {
        link:"/discovery",
        first: "Explore This Feature Now",
        second: "Buy Full Access @ ₹4500/yr",
      },
    },
    {
      imagePath: "/timesCarousel.png",
      Info: {
        heading: "Sovrenn Times",
        listItems: [ "Daily 5 articles covering key events in smallcap and microcap space",  
          "Receive coverage on large orders, capacity expansions, fundraising, and more",  
          "Stay updated with important information that matters every day"
          ],
      },
      button: {
        link:"/times",
        first: "Explore This Feature Now",
        second: "Buy Full Access @ ₹4500/yr",
      },
    },
    {
      imagePath: "/primeCarousel.png",
      Info: {
        heading: "Sovrenn Prime",
        listItems: ["Read in-depth articles on promising smallcap and microcap companies",  
          "Discover emerging opportunities and growth potential",  
          "Stay informed with key insights into the companies that matter"
          ],
      },
      button: {
        link:"/prime",
        first: "Explore This Feature Now",
        second: "Buy Full Access @ ₹4500/yr",
      },
    },

    {
      imagePath: "/ipoCarousel.png",
      Info: {
        heading: "Sovrenn IPO",
        listItems: ["Access IPO stock articles to equip yourself with crucial information",  
          "Stay informed before making investment decisions with in-depth IPO insights",  
          "Get detailed coverage on upcoming IPOs to make informed choices"
          
          ],
      },
      button: {
        link:"/ipo-zone",
        first: "Explore This Feature Now",
        second: "Buy Full Access @ ₹5000/yr",
      },
    },
    {
      imagePath: "/selfhelpCarousel.png",
      Info: {
        heading: "Sovrenn Self-help",
        listItems: ["The self-help tool offers a simple model to predict potential future share prices", 
         "Gain insights into stock performance with an easy-to-use prediction tool",  
          "Make informed investment decisions by analyzing potential future stock prices"
          
          
          ],
      },
      button: {
        link:"/self-help",
        first: "Explore This Feature Now",
        second: "Buy Full Access @ ₹4500/yr",
      },
    },
    {
      imagePath: "/anonymous.png",
      Info: {
        heading: "Sovrenn Knowledge",
        listItems: ["Access IPO stock articles to equip yourself with crucial information",  
          "Stay informed before making investment decisions with in-depth IPO insights",  
          "Get detailed coverage on upcoming IPOs to make informed choices"
          
          ],
      },
      button: {
        link:"/knowledge",
        first: "Explore This Feature Now",
        second: "Buy Full Access @ ₹4500/yr",
      },
    },
    
  ];