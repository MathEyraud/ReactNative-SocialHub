import { styles } from "./style";
import { ImageBackground } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export function ContainerApp({children}){


    return (

        <SafeAreaProvider>

            <SafeAreaView style={styles.container}>

            {children}

            </SafeAreaView>

        </SafeAreaProvider>

    )
}