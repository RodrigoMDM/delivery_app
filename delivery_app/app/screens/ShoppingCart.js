import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView, View, Text, Alert } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Header from "../components/Header";
import * as shoppingCart from '../helpers/shopping-cart.helper';
 
export default function ShoppingCart({ navigation }) {
 
    const [produtos, setProdutos] = useState([]);
    const [valorTotal, setValorTotal] = useState('');
    const [qtdItens, setQtdItens] = useState('');
 
    //recarregar o componente
    const isFocused = useIsFocused();
 
    //função do REACT HOOKS executada
    //quando o componente é aberto
    useEffect(
        () => {
            setProdutos(null);
            setQtdItens(0);
            setValorTotal(0);
 
            setTimeout(() => {
                obterProdutos();
            }, 1000);
 
            const sub = navigation.addListener
                ('focus', () => {
                    setTimeout(() => {
                        obterProdutos();
                    }, 1000);
                })
 
            return sub;
        }, [navigation]
    );
 
 
    const obterProdutos = () => {
        shoppingCart.getAll()
            .then(resultProdutos => {
 
                setProdutos(resultProdutos);
 
                shoppingCart.getValorTotal()
                    .then(resultValorTotal => {
                        setValorTotal(resultValorTotal);
 
                        shoppingCart.getQtdItens()
                            .then(resultQtdItens => {
                                setQtdItens(resultQtdItens);
                            });
                    });
            });
    }
 
    const adicionar = (produto) => {
        shoppingCart.add(produto);
        setTimeout(() => {
            obterProdutos();
        }, 1000);
    }
 
    const remover = (produto) => {
        shoppingCart.remove(produto);
        setTimeout(() => {
            obterProdutos();
        }, 1000);
    }
 
    const removerTodos = () => {
        shoppingCart.removeAll();
        Alert.alert('Sucesso', 'Todos os itens foram removidos do carrinho de compras.');
        setTimeout(() => {
            obterProdutos();
        }, 1000);
    }
 
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
 
            {
                isFocused && <View>
                    {/* barra de menu */}
                    <Header navigation={navigation} />
 
                    {/* título do aplicativo */}
                    {
                        produtos != null && qtdItens > 0 && <Card style={{ backgroundColor: '#fafafa' }}>
                            <Card.Title
                                title="Carrinho de Compras"
                                titleStyle={{
                                    fontSize: 14
                                }}
                            />
                            <Card.Content>
                                <View style={{ marginTop: -10 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                        Total: R$ {valorTotal}
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                                        Quantidade de itens: {qtdItens}
                                    </Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Button style={{ fontWeight: 'bold' }}
                                        mode="contained"
                                        icon="cart-outline"
                                        onPress={() => navigation.navigate('checkout')}
                                    >
                                        Finalizar Pedido
                                    </Button>
                                </View>
                            </Card.Content>
                        </Card>
                    }
 
                    {/* itens do carrinho de compras */}
                    {
                        produtos != null && qtdItens > 0 && produtos.map(function (item, i) {
                            return (
                                <Card key={i}>
                                    <Card.Content>
                                        <View>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {item.nome}
                                            </Text>
                                            <Text>
                                                Preço: R$ {item.preco}
                                            </Text>
                                            <Text>
                                                Quantidade: {item.quantidade}
                                            </Text>
                                            <Text>
                                                Total: R$ {item.preco * item.quantidade}
                                            </Text>
                                        </View>
                                    </Card.Content>
                                    <Card.Actions>
                                        <Button icon="plus" mode="text"
                                            onPress={() => adicionar(item)}>
                                            Adicionar
                                        </Button>
                                        <Button icon="minus" mode="text"
                                            onPress={() => remover(item)}>
                                            Remover
                                        </Button>
                                    </Card.Actions>
                                </Card>
                            )
                        })
                    }
 
                    {
                        produtos != null && qtdItens > 0 && <View style={{ marginTop: 10, marginBottom: 20 }}>
                            <Button style={{ fontWeight: 'bold' }}
                                mode="outlined"
                                icon="cart-outline"
                                onPress={() => removerTodos()}
                            >
                                Limpar Carrinho de Compras
                            </Button>
                        </View>
                    }
 
                    {
                        qtdItens == 0 && <Card style={{ backgroundColor: '#fafafa' }}>
                            <Card.Title
                                title="Carrinho de Compras"
                                titleStyle={{
                                    fontSize: 14
                                }}
                            />
                            <Card.Content>
                                <View style={{ marginTop: -10 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                        Não há itens no seu carrinho de compras
                                    </Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Button style={{ fontWeight: 'bold' }}
                                        mode="outlined"
                                        icon="home"
                                        onPress={() => navigation.navigate('all-products')}
                                    >
                                        Ver produtos
                                    </Button>
                                </View>
                            </Card.Content>
                        </Card>
                    }
                </View>
            }
 
        </ScrollView>
    )
}
 

