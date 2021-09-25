import React from 'react'
import { StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'

//Componente para mostrar una pantalla modal
export default function Modal({ isVisible, setVisible, children }) {
    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={styles.overlay}
        >
            {
                children
            }
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        width: "90%"
    }
})