import React, { useContext } from "react";
import { Text, FlatList, View } from "react-native";
import users from "../data/users";
import { ListItem, Avatar, Icon, Button } from "react-native-elements";
import { Alert } from "react-native";
import UsersContext from "../context/UsersContext";

export default (props) => {
  const { state, dispatch } = useContext(UsersContext);

  function confirmUserDeletion(user) {
    Alert.alert("Excluir Usuário", "Deseja excluir o cliente?", [
      {
        text: "Sim",
        onPress() {
          dispatch({ type: "deleteUser", payload: user });
        },
      },
      {
        text: "Não",
      },
    ]);
  }

  function getActions(user) {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate("UserForm", user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />
        <Button
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </>
    );
  }

  const getUserItem = ({ item: user }) => {
    return (
      <ListItem
        bottomDivider
        onPress={() => props.navigation.navigate("UserForm", user)}
      >
        <Avatar source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.phone}</ListItem.Subtitle>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {getActions(user)}
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View>
      <FlatList
        data={state.users}
        keyExtractor={(user) => user.id.toString()}
        renderItem={getUserItem}
      />
    </View>
  );
};
