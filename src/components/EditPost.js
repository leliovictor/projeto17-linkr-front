import styled from "styled-components";
import axios from "axios";
import { useCallback, useEffect, useRef, useState, useImperativeHandle  } from "react";

export default function EditPost({ postId}) {
    //const [visible, setVisible] = useState(false)
    const [ click, setClick] = useState(false)
    const inputRef = useRef()

    /*
    function AcessingElement() {
        useEffect(() => {
            inputRef.current.focus()
            console.log("acessando testando: ", inputRef.current, "focus: ", inputRef.current.focus())  
        })

        return (
            <>
            </>
        )
    }*/

    useEffect(() => {

        inputRef.current.focus()
        //console.log("acessando testando: ", inputRef.current, "focus: ", inputRef.current.focus())

        inputRef.current = "mudando valor"

        console.log("novo valor?: ", inputRef.current)


    },[click])


    function acessingElement() {

    }    


    return (
        <>
            <input ref={inputRef} />
            <ion-icon name="pencil-outline" onClick={() => setClick(true)}></ion-icon>
        </>
    )
}