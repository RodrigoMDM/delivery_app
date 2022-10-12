import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function Header({ navigation }) {

    return (
        <View>
            <Appbar.Header>
                <Appbar.Content
                    title="App Delivery"
                    subtitle="Faça seu pedido aqui!"
                    titleStyle={{
                        fontSize: 16
                    }}
                    subtitleStyle={{
                        fontSize: 15
                    }}
                />
                <Appbar.Action
                    icon="home-outline"
                    onPress={
                        () => navigation.navigate('all-products')
                    }
                />
                <Appbar.Action
                    icon="cart-outline"
                    onPress={
                        () => navigation.navigate('shopping-cart')
                    }
                />
                <Appbar.Action
                    icon="account-circle-outline"
                    onPress={
                        () => navigation.navigate('user-login')
                    }
                />
            </Appbar.Header>
        </View>
    )

}