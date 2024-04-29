import { Button, FlatList, Image, SafeAreaView, Text, View } from "react-native";
import auth from '@react-native-firebase/auth';
import CustomButton from "../../components/Button/customButton";

export default function Home({navigation,route}){
    const signOut =async ()=>{
        await auth().signOut().then(() => console.log('User signed out!'));
        navigation.popToTop()
    }
    const user = route.params.user;
    const photoURL = user.photoURL
    console.log(user.photoURL);
    const addNote =()=>{

    }

    return(
        <>
        <SafeAreaView>
        <View>
          <View>
            <Text>Welcome {user.email}</Text>
            <Text>Note Taking App</Text>
          </View>
          <View>
            <Image
            //   style={styles.image}
              source={{
                uri: {photoURL}
              }}></Image>
          </View>
          <View>
          {/* <FlatList
            data={data}
            numColumns={1}
            renderItem={({item}) => <Box text={item} nav={navigation}></Box>}
          /> */}
        </View>
        <View>
            {/* add note */}
            <CustomButton text='Add Note' onPress={addNote}/>
        </View>
        </View>
            <Button title="SignOut" onPress={signOut}/>
        </SafeAreaView>
        </>
    )
}