import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, ActivityIndicator } from 'react-native'



export default function SignUp(){

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async () => {
        setError("")
        setLoading(true)

        try {
        } catch (err) {
            setError('Sign up failed')
        } finally {
            setLoading(false)
        }
    } 

    return(
        <View style={styles.container}>
            <View style={styles.loginContent}>
                <Text style={styles.title}>Sign Up</Text>

                <View style={styles.field}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="example@example.com"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style= {styles.input}
                        secureTextEntry
                    />
                </View>

                {!!error && <Text style={styles.error}>{error}</Text>}

                <Pressable
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ): (
                        <Text style={styles.buttonText}>Sign Up</Text>
                    )}
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#888',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    loginContent: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    field: {
        marginBottom: 12,
    },
    label: {
        marginBottom: 6,
        fontSize: 14,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    button: {
        marginTop: 8,
        backgroundColor: '#2d6cdf',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
    },
    error: {
        color: '#d00',
        marginTop: 4,
        marginBottom: 6,
  },
})