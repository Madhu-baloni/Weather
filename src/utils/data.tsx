export const getAQIDescription = (
  aqi: number
): { label: string; icon: string; color: string; image: string } => {
  switch (aqi) {
    case 1:
      return {
        label: "Good : Enjoy outdoor activities.",
        icon: "😊",
        color: "#4caf50",
        image:
          "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQoQ77dXenrp8d33TghFNDyttlgEjz2pjDWgEJcaC55HwWKuSed",
      };
    case 2:
      return {
        label: "Moderate : Safe for most.",
        icon: "😐",
        color: "#8B8000",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwHm4gR24GZzwVcAuKTGTaMJm2qoysb1xZVlAh-LInMEbV_L76iwno0qKpcMOJ-CTrNJ4&usqp=CAU",
      };
    case 3:
      return {
        label: "Unhealthy (Sensitive): for sensitive groups.",
        icon: "😷",
        color: "#ff9800",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvTkdRwB2GBSncrudwh45Bzw-G1KEMumKsTMLJQDy-qhKenoEqKaGsz6Y5ifh984dJ0mQ&usqp=CAU",
      };
    case 4:
      return {
        label: "Unhealthy : Reduce outdoor time.",
        icon: "🤒",
        color: "#f44336",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDhD4oCpXTFI9ULLQ21rohB4k_XCBNe0XfXkAZYSfK2A75KbIDjKlQpMKoCnzbOSPMRIY&usqp=CAU",
      };
    case 5:
      return {
        label: "Very Unhealthy",
        icon: "☠️",
        color: "#9c27b0",
        image:
          "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcScgkTjRKH-a1bpSOLfm2_Fd-d0tLHZ2bpabjG2riHEICBqoxLr",
      };
    default:
      return {
        label: "Unnkown :  Stay indoors.",
        icon: "☠️",
        color: "#4caf50",
        image:
          "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTtE57TzrT0mu8189gtdoo-oHo_D4nsaczeqTjHy93nf5lQeD2W",
      };
  }
};

export const getCloudImage = (clouds: string): string => {
  const cloudMap: { [key: string]: string } = {
    "clear sky": "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    "few clouds": "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    "scattered clouds":
      "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
    "broken clouds": "https://cdn-icons-png.flaticon.com/512/1163/1163636.png",
    "overcast clouds":
      "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
  };
  return (
    cloudMap[clouds.toLowerCase()] ||
    "https://cdn-icons-png.flaticon.com/512/414/414825.png"
  );
};
