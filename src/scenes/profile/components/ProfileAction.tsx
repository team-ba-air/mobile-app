import React from 'react'
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';

interface ProfileActionProps {
  
}

const actionItems = [
  {
    title: 'Frequently Ask Question (FAQ)',
    url: '',
  },
  {
    title: 'Ketentuan Privasi',
    url: '',
  },
  {
    title: 'Legal',
    url: '',
  },
  {
    title: 'Hubungi Customer Service (WhatsApp)',
    url: null,
  },
]

const ProfileAction: React.FC<ProfileActionProps> = () => {
  return ( 
    <FlatList
      data={actionItems}
      renderItem={({ item }) => (
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={Color.gray.secondary} size={24} />
        </ListItem>
      )}
    />
   );
}
 
export default ProfileAction;