import colors from "../theme/colors";

// Fonction pour calculer la luminance d'une couleur en fonction de ses composants RGB
function getLuminance(r, g, b) {

    const a = [r, g, b].map(value => {

      value /= 255;
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });

    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

// Convertir le code hexadécimal en valeurs RGB
function hexToRgb(hex) {

    // Supprimer le caractère '#' s'il est présent
    const sanitizedHex = hex.startsWith('#') ? hex.slice(1) : hex;

    // Convertir les deux premiers caractères en valeur R
    const rHex = sanitizedHex.substring(0, 2);
    const r = parseInt(rHex, 16);

    // Convertir les deux caractères suivants en valeur G
    const gHex = sanitizedHex.substring(2, 4);
    const g = parseInt(gHex, 16);

    // Convertir les deux derniers caractères en valeur B
    const bHex = sanitizedHex.substring(4, 6);
    const b = parseInt(bHex, 16);

    return { r, g, b };
  }


export function getContrastColor(backgroundColor) {


    const backgroundColorRgb        = hexToRgb(backgroundColor);
    const luminanceBackgroundColor  = getLuminance(backgroundColorRgb.r, backgroundColorRgb.g, backgroundColorRgb.b);

    // Choisir la couleur de contraste en fonction de la luminance
    if (luminanceBackgroundColor > 0.5) {
        return colors.black;

    } else {
        return colors.white;
    }
}