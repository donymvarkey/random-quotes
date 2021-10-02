import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Quotes() {
    const url = "https://api.quotable.io/random";
    const [quote, setQuote] = useState([]);

    const getQuote = () => {
        axios.get(url)
         .then((res) => {
             console.log(res.data)
             setQuote(res.data)
         })
    }

    useEffect(() => {
        getQuote();
    }, [])

    const getNewQuote = () =>{
        getQuote()
    }
    const createSuccessToast = () => {
        toast("Copied to clipboard 📋", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
        })
    }
    const createErrorToast = (err) => {
        toast.error(err, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }
    const copyToClipboard = () => {
        const content = `${quote.content} -${quote.author}`;
        if (typeof (navigator.clipboard) == 'undefined') {
            console.log('navigator.clipboard');
            var textArea = document.createElement("textarea");
            textArea.value = content;
            textArea.style.position = "fixed";  //avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
        
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'Copied to clipboard 📋' : 'Unable to copy to clipboard';
                toast(msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            } catch (err) {
                toast(err, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
        
            document.body.removeChild(textArea)
            return;
        }
        navigator.clipboard.writeText(content).then(function () {
            createSuccessToast()
        }, function (err) {
            createErrorToast(err)
        });
        
    }
    return (
        <div className="container">
            <div className="mt-5 p-2">
                <div className="card p-2">
                    <div className="card-body">
                        <figure class="text-center">
                            <blockquote class="blockquote p-2 quote">
                                <p className="h4 fw-bold" >"{quote.content}"</p>
                            </blockquote>
                            <figcaption class="blockquote-footer text-end">
                                <cite title="Source Title">{quote.author}</cite>
                            </figcaption>
                        </figure>
                    
                        <div className="row g-2">
                            <div className="col">
                                <button className="btn btn-primary" onClick={getNewQuote}>Get New Quote</button>
                            </div>
                            <div className="col text-end">
                                <button className="btn btn-light ml-3" data-bs-toggle="tooltip" data-bs-placement="left" title="Copy" onClick={copyToClipboard}><i class="bi bi-clipboard"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-white">
                        <div className="row text-center">
                            <div className="col-md-6">
                                <p>Powered By <a className="text-decoration-none" href="https://github.com/lukePeavey/quotable" target="_blank">quotable.io</a></p>
                            </div>
                            <div className="col-md-6">
                                <a className="text-decoration-none" href="https://github.com/donymvarkey/random-quotes.git" target="_blank"><i className="bi-github fs-4"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <ToastContainer />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
