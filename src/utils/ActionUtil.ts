import { Linking } from "react-native";

const openWhatsApp = (number: string) => {
  let url = `https://wa.me/${number}`

  Linking.canOpenURL(url)
		.then((supported) => {
			if (supported) {
				return Linking.openURL(url)
					.catch(() => null);
			}
		});
}

export { openWhatsApp }