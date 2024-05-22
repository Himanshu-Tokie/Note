import StaggeredList from '@mindinventory/react-native-stagger-view';
import { useNavigation } from '@react-navigation/native';
import ListTemplate from '../listTemplate/listTemplate';

export default function StaggedLabel({data}){
    const navigation = useNavigation();
    const renderChildren = item => {
        return (
            <ListTemplate note={item} nav={navigation} maxHeight={150} />
        );
      };
    return (
        <StaggeredList
            data={data}
            // contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => renderChildren(item)}
          />
    )
}