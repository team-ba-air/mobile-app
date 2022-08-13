import { Linking } from "react-native";

const openWhatsApp = (number: string) => {
  let url = `https://wa.me/${number}`

	console.log('BUKA WA')

	Linking.openURL(url)
		.catch((e) => console.log(e));
}

export { openWhatsApp }