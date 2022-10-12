import React from "react";
import { ScrollView, View, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';
import Header from "../components/Header";
import * as helper from '../helpers/shopping-cart.helper';
 
export default function CheckoutSuccess({ navigation }) {
 
    const confirmar = () => {
        helper.removeAll();
        navigation.navigate('all-products');
    }
 
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <Header navigation={navigation} />
            <Card style={{
                backgroundColor: '#fff',
            }}>
                <Card.Cover
                    source={{ uri: "https://shipsy.io/wp-content/uploads/2021/06/Blog-52A.jpg" }}
                />
                <Card.Content>
                    <View style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20,
                        marginTop: 40
                    }}>
                        <Text style={{
                            fontSize: 30,
                            fontWeight: '600',
                        }}>
                            Sucesso!
                        </Text>
                    </View>
                    <View style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                        }}>
                            Parabéns Sergio da Silva, seu pedido foi realizado com sucesso!
                        </Text>
                    </View>
                    <View style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20
                    }}>
                        <Text style={{
                            fontSize: 16,
                        }}>
                            Você receberá um email com o status do seu pedido.
                        </Text>
                    </View>
                    <View style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20
                    }}>
                        <Button mode="contained" onPress={() => confirmar()}
                            style={{ width: 300 }}>
                            OK
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}
 

