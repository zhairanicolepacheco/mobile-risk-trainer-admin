import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        color: '#059212',
    },
    tagline: {
        fontSize: 14,
        color: '#06D001',
        marginBottom: 20,
    },
    header: {
        alignSelf: 'flex-start',
        fontSize: 32,
        fontWeight: '700',
        marginTop: 20,
    },
    subheader: {
        alignSelf: 'flex-start',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: '#f9f9f9',
        width: '100%',
    },
    icon: {
        paddingLeft: 20,
        paddingRight: 10,
    },
    input: {
        height: 40,
        flex: 1,
        padding: 10,
        borderRadius: 20,
    },
    button: {
        height: 40,
        width: '100%',
        backgroundColor: '#059212',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles;
