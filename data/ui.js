const UI_DATA = {
  en: {
    appTitle: "BetweenUs",
    appSubtitle: "Free conversation prompts for couples — together or far apart.",
    backBtn: "← All Topics",
    nextBtn: "Next Question",
    copyBtn: "Copy for Chat",
    exploreTopicsBtn: "Explore more topics",
    cleanViewOn: "Clean View",
    cleanViewOff: "Show Buttons",
    resetTopicBtn: "Reset Seen Questions in This Topic",
    seenLabel: "{seen} / {total} seen",
    openDeckLabel: "Open →",
    allSeenMessage: "You have seen every question in this topic! Tap Reset below to play again.",
    copiedToast: "Copied to clipboard!",
    resetToast: "Topic progress reset."
  },
  my: {
    appTitle: "BetweenUs",
    appSubtitle: "စုံတွဲများအတွက် အခမဲ့ စကားစမြည်ပြောစရာ မေးခွန်းများ",
    backBtn: "← ခေါင်းစဉ်အားလုံးသို့",
    nextBtn: "နောက်မေးခွန်း",
    copyBtn: "စာပို့ရန် ကူးယူမည်",
    exploreTopicsBtn: "အခြားခေါင်းစဉ်များ ကြည့်မည်",
    cleanViewOn: "ရှင်းလင်းမြင်ကွင်း",
    cleanViewOff: "ခလုတ်များပြန်ပြရန်",
    resetTopicBtn: "ဤခေါင်းစဉ်မှ ကြည့်ပြီးသားများကို ပြန်စမည်",
    seenLabel: "{seen} / {total} ခု ကြည့်ပြီး",
    openDeckLabel: "ဖွင့်မည် →",
    allSeenMessage: "ဒီခေါင်းစဉ်ထဲက မေးခွန်းအားလုံးကို ကြည့်ပြီးပါပြီ။ ပြန်စရန် အောက်ကခလုတ်ကို နှိပ်ပါ။",
    copiedToast: "ကူးယူပြီးပါပြီ!",
    resetToast: "ကြည့်ပြီးသားမှတ်တမ်းကို ပြန်စလိုက်ပါပြီ။"
  }
};

const TOPICS = [
  {
    id: "fun",
    en: {
      title: "Fun",
      description: "Lighthearted prompts, playful debates, and easy laughs."
    },
    my: {
      title: "ပျော်ရွှင်စရာ",
      description: "ပေါ့ပေါ့ပါးပါး ရယ်မောစရာနှင့် ပျော်စရာ မေးခွန်းများ"
    }
  },
  {
    id: "future",
    en: {
      title: "Future",
      description: "Goals, travel dreams, and what you want to build together."
    },
    my: {
      title: "အနာဂတ်",
      description: "ရည်မှန်းချက်များ၊ ခရီးသွားအိပ်မက်များနှင့် အတူတူတည်ဆောက်မည့် အနာဂတ်"
    }
  },
  {
    id: "emotional",
    en: {
      title: "Emotional Intimacy",
      description: "Feelings, trust, support, and feeling truly understood."
    },
    my: {
      title: "စိတ်ခံစားမှု နီးစပ်ခြင်း",
      description: "ခံစားချက်များ၊ ယုံကြည်မှုနှင့် တစ်ဦးကိုတစ်ဦး နားလည်ပေးခြင်း"
    }
  },
  {
    id: "physical",
    en: {
      title: "Physical Intimacy",
      description: "Affection, romance, comfort, and physical closeness."
    },
    my: {
      title: "ရင်းနှီးနွေးထွေးမှု",
      description: "ကြင်နာမှု၊ ရိုမန်တစ်ဆန်မှုနှင့် ကိုယ်ချင်းနီးကပ်မှုဆိုင်ရာ မေးခွန်းများ"
    }
  }
];
