import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, Alert } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import Header from "../components/Header";
import * as shoppingCart from '../helpers/shopping-cart.helper';
import * as services from '../services/delivery-services';
import * as config from '../config/api-config';
import { Picker } from '@react-native-picker/picker';
 
export default function AllProducts({ navigation }) {
 
    //armazenar os dados dos produtos e categorias
    const [itens, setItens] = useState([]);
    const [categorias, setCategorias] = useState([]); //populando o campo
    const [categoria, setCategoria] = useState(''); //capturar o valor selecionado
 
    //capturando os dados no momento em que o componente
    //for aberto -> useEffect
    useEffect(
        () => {
            obterDados();
            const sub = navigation.addListener('focus', () => { obterDados() })
            return sub;
        }, [navigation]
    );
 
    obterDados = () => {
        services.getItens()
            .then(data => { setItens(data); })
            .catch(e => { console.log('Erro ao obter itens: ' + e) });
 
        services.getCategorias()
            .then(data => { setCategorias(data); })
            .catch(e => { console.log('Erro ao obter categorias: ' + e) });
    }
 
    //função para adicionar um item no carrinho
    const adicionarItem = (item) => {
 
        let produto = {
            id: item.id,
            nome: item.nome,
            preco: item.precoDecimal,
        }
 
        shoppingCart.add(produto);
 
        Alert.alert('Sucesso!', `Produto ${produto.nome} adicionado ao carrinho de compras.`);
        navigation.navigate('shopping-cart');
    };
 
    //função para filtrar os produtos pela categoria
    const filtrarProdutos = (idCategoria) => {
        setCategoria(idCategoria);
        services.getItens(idCategoria)
            .then(data => { setItens(data); })
            .catch(e => { console.log('Erro ao obter itens: ' + e) });
    }
 
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
 
            {/* topo da página */}
            <Header navigation={navigation} />
 
            {/* título da página */}
            <Card style={{ backgroundColor: '#fafafa' }}>
               
                <Card.Content>
                    <View style={{ marginTop: -10 }}>
 
                        <Picker
                            selectedValue={categoria}
                            onValueChange={(itemValue, itemIndex) =>
                                filtrarProdutos(itemValue)
                            }>
 
                            <Picker.Item label="Todas as categorias" value="0" />
 
                            {
                                categorias.map(
                                    function (item, i) {
                                        return (
                                            <Picker.Item
                                                key={i}
                                                label={item.nome}
                                                value={item.id}
                                            />
                                        )
                                    }
                                )
                            }
 
                        </Picker>
 
                    </View>
                </Card.Content>
            </Card>
 
            {/* exibição dos produtos */}
            {
                itens.map(function (item, i) {
                    return (
                        <Card key={i}>
                            <Card.Title
                                title={item.nome}
                                subtitle={item.preco}
                                titleStyle={{ fontSize: 18 }}
                                subtitleStyle={{ fontSize: 16, fontWeight: 'bold' }}
                            />
                            <Card.Content>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {item.categoria.nome}
                                </Text>
                                <Text style={{ marginBottom: 20 }}>
                                    {item.descricao}
                                </Text>
                            </Card.Content>
                            <Card.Cover
                                source={{ uri: `${config.getBaseUriDelivery()}${item.foto}` }}
                            />
                            <Card.Actions>
                                <Button style={{ fontWeight: 'bold' }}
                                    mode="outlined"
                                    icon="cart-outline"
                                    onPress={() => adicionarItem(item)}
                                >
                                    Adicionar ao pedido
                                </Button>
                            </Card.Actions>
                        </Card>
                    )
                })
            }
 
        </ScrollView>
    )
}




