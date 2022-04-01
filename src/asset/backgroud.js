const background = [
    "https://jobchat-production.s3-ap-southeast-1.amazonaws.com/iconsProjectDefault/oval_10.jpg",
    "https://jobchat-production.s3-ap-southeast-1.amazonaws.com/iconsProjectDefault/oval_3.jpg",
    "https://jobchat-production.s3-ap-southeast-1.amazonaws.com/iconsProjectDefault/oval_4.jpg",
    "https://jobchat-production.s3-ap-southeast-1.amazonaws.com/iconsProjectDefault/oval_8.jpg",
    "https://jobchat-production.s3-ap-southeast-1.amazonaws.com/iconsProjectDefault/oval_9.jpg",
    "https://jobchat-production.s3-ap-southeast-1.amazonaws.com/iconsProjectDefault/oval_6.jpg",
    "https://jobchat-production.s3-ap-southeast-1.amazonaws.com/iconsProjectDefault/oval_1.jpg",
    "https://jobchat-production.s3-ap-southeast-1.amazonaws.com/iconsProjectDefault/oval_7.jpg"

]
export default function RamdomBackground() {
    return background[Math.floor(Math.random() * background.length)]
} 