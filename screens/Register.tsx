import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';
import  api  from '../services/api';
import { RootStackParamList } from '../types/navigation';// Update this import path

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext);

    const handleRegister = async () => {
        try {
            const response = await api.post('api/users/register', {
                name,
                email,
                password
            });

            if (response.status === 201 && authContext) {
                authContext.signIn(response.data.token);
                navigation.navigate('HomeScreen');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
            <View style={styles.linkContainer}>
                <Text style={styles.text}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.link}>Login here</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    linkContainer: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
    },
    link: {
        fontSize: 16,
        color: 'blue',
    },
});

export default RegisterScreen;
