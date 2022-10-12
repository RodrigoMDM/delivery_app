import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { useIsFocused } from "@react-navigation/native";
import { Card, Button, TextInput } from 'react-native-paper';
import Header from "../components/Header";
import * as shoppingCart from '../helpers/shopping-cart.helper';
import * as cepServices from '../services/cep-services';
import * as pedidoServices from '../services/pedido-services';
 
export default function Checkout({ navigation }) {
 
    const [produtos, setProdutos] = useState([]);
    const [valorTotal, setValorTotal] = useState('');
    const [qtdItens, setQtdItens] = useState('');
    const [endereco, setEndereco] = useState({});
 
    //recarregar o componente
    const isFocused = useIsFocused();
 
    const {
        control,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm();
 
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
 
    const onSubmit = (data) => {
        cepServices.getEndereco(data.cep)
            .then(
                (result) => {
                    setEndereco(result);
                }
            )
            .catch(
                (e) => {
                    console.log(e);
                }
            )
    }
 
    const finalizarPedido = (data) => {
 
        let listaProdutos = [];
        for(var i = 0; i < produtos.length; i++){
            listaProdutos.push({
                idItem : produtos[i].idProduto,
                quantidade: produtos[i].quantidade
            })
        }
 
        let request = {
            itensPedido: listaProdutos,
            logradouro: endereco.logradouro,
            complemento: data.pontoreferencia,
            numero: data.numero,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            estado: endereco.uf,
            cep: data.cep
          }
 
        pedidoServices.postPedido(request)
            .then(
                result => {
                    console.log(result);
                    navigation.navigate('checkout-success');
                }
            )
            .catch(
                e => {
                    console.log(e);
                    Alert.alert('Falha', 'O pedido não pôde ser realizado, tente novamente.');
                }
            );
    }
 
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
 
            <Header navigation={navigation} />
 
            {/* título do aplicativo */}
            {
                produtos != null && qtdItens > 0 && <Card style={{ backgroundColor: '#fafafa' }}>
                    <Card.Title
                        title="Finalizar Pedido"
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
                                        Preço: R$ {item.preco}, Quantidade: {item.quantidade}, Total: R$ {item.preco * item.quantidade}
                                    </Text>
                                </View>
                            </Card.Content>
                        </Card>
                    )
                })
            }
 
            <Card>
                <Card.Content>
                    <View>
                        <Text>Informe o CEP de entrega:</Text>
 
                        <Controller
                            control={control}
                            name="cep"
                            defaultValue=''
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ height: 40, marginTop: 6 }}
                                        label="Informe seu cep aqui"
                                        keyboardType="number-pad"
                                        autoComplete="cc-number"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />
 
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Button style={{ fontWeight: 'bold' }}
                            mode="outlined"
                            icon="check-circle"
                            onPress={handleSubmit(onSubmit)}
                        >
                            Obter Endereço.
                        </Button>
                    </View>
                </Card.Content>
            </Card>
 
            {
                endereco && endereco.logradouro && <Card>
                    <Card.Content>
                        <View style={{ fontSize: 14 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Endereço para entrega:
                            </Text>
                            <Text>
                                {endereco.logradouro}
                            </Text>
                            <Text>
                                Bairro: {endereco.bairro}
                            </Text>
                            <Text>
                                Cidade: {endereco.localidade}
                            </Text>
                            <Text>
                                UF: {endereco.uf}
                            </Text>
                        </View>
 
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <Text>Informe o número:</Text>
 
                            <Controller
                                control={control}
                                name="numero"
                                defaultValue=''
                                render={
                                    ({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={{ height: 40, marginTop: 6 }}
                                            label="Informe o número aqui"
                                            keyboardType="number-pad"
                                            autoComplete="cc-number"
                                            mode="outlined"
                                            placeholder="Digite aqui"
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                        />
                                    )
                                }
                            />
 
                        </View>
 
                        <View style={{ marginBottom: 10 }}>
                            <Text>Informe o ponto de referência:</Text>
 
                            <Controller
                                control={control}
                                name="pontoreferencia"
                                defaultValue=''
                                render={
                                    ({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={{ height: 40, marginTop: 6 }}
                                            label="Informe o ponto de referência aqui"
                                            keyboardType="default"
                                            mode="outlined"
                                            placeholder="Digite aqui"
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                        />
                                    )
                                }
                            />
 
                        </View>
 
                        <View style={{ marginBottom: 20 }}>
                            <Button style={{ fontWeight: 'bold' }}
                                mode="contained"
                                icon="check-circle"
                                onPress={handleSubmit(finalizarPedido)}
                            >
                                Finalizar Pedido.
                            </Button>
                        </View>
 
                    </Card.Content>
                </Card>
            }
 
        </ScrollView>
    )
}


