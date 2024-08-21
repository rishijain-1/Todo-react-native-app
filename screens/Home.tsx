import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const authContext = useContext(AuthContext);

    const handleLogout = () => {
        if (authContext) {
            authContext.signOut();
            navigation.navigate('LoginScreen'); // Navigate to LoginScreen after logout
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            {authContext?.user ? (
                <Text style={styles.text}>Welcome, {authContext.user.name}!</Text>
            ) : (
                <Text style={styles.text}>Welcome!</Text>
            )}
            <Button title="Logout" onPress={handleLogout} />
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
    text: {
        fontSize: 18,
        marginBottom: 24,
        textAlign: 'center',
    },
});

export default HomeScreen;
