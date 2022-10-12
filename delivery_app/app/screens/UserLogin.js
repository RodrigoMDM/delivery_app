import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, View, Text, Alert } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import Header from "../components/Header";
import * as validations from '../validations/user-account.validation';
import * as services from '../services/user-services';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default function UserLogin({ navigation }) {
 
    const {
        control,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm();
 
    const onSubmit = (data) => {
 
        services.postLogin(data)
            .then(
                result => {
 
                    //gravando o token do usuário na AsyncStorage
                    AsyncStorage.setItem("access_token", result.accessToken);
 
                    //limpando o formulário
                    reset({ email: '', senha: '' });
 
                    //redirecionando
                    navigation.navigate('checkout');
                }
            )
            .catch(
                e => {
                    console.log(e.response);
                    Alert.alert('Falha!', e.response.data.message);
                }
            )
    }
 
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <Header navigation={navigation} />
            <Card style={{ backgroundColor: '#fafafa' }}>
                <Card.Title
                    title="Acesse sua Conta"
                    subtitle="Informe seus dados para acessar sua conta."
                    titleStyle={{
                        fontSize: 14
                    }}
                />
            </Card>
 
            <Card>
                <Card.Content>
                    <View style={{ marginBottom: 20 }}>
                        <Text>Email de Acesso:</Text>
                        <Controller
                            control={control}
                            name="email"
                            defaultValue=''
                            rules={{ validate: validations.emailValidation }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ height: 40, marginTop: 6 }}
                                        label="Informe seu email aqui"
                                        keyboardType="default"
                                        autoComplete="name"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />
 
                        {
                            errors.email && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.email.message}
                            </Text>
                        }
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text>Senha de Acesso:</Text>
                        <Controller
                            control={control}
                            name="senha"
                            defaultValue=''
                            rules={{ validate: validations.senhaValidation }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ height: 40, marginTop: 6 }}
                                        label="Informe sua senha aqui"
                                        keyboardType="default"
                                        secureTextEntry={true}
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />
 
                        {
                            errors.senha && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.senha.message}
                            </Text>
                        }
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Button style={{ fontWeight: 'bold' }}
                            mode="contained"
                            icon="check-circle"
                            onPress={handleSubmit(onSubmit)}
                        >
                            Acessar Conta
                        </Button>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Button style={{ fontWeight: 'bold' }}
                            mode="outlined"
                            icon="account-circle"
                            onPress={() => navigation.navigate('user-account')}
                        >
                            Criar Conta de Cliente.
                        </Button>
                    </View>
                </Card.Content>
            </Card>
 
        </ScrollView>
    )
}


