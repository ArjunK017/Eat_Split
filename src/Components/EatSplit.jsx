import React, { useState } from "react";
import rampic from '../assets/ram.jpg';
import jipic from '../assets/jithu.jpg';
import '../imagehandl.css';

export function EatSplit() 
{
    let [splitbtn1, setSplitBtn1] = useState(false);
    let [selectedUser, setSelectedUser] = useState(null);
    let [friendName, setFriendName] = useState('');
    let [addFriend, setAddFriend] = useState(null);
    let [viewFriendInp, setViewFriendInp] = useState(false);
    let [friendImage, setFriendImage] = useState(null);
    let [totAmt, setTotAmt] = useState(null);
    let [myExp, setMyExp] = useState(null);
    let [frndExp, setFrndExp] = useState(null);
    let [whoPaid, setWhoPaid] = useState('');

    let [users, setUsers] = useState([
        { id: 101, name: 'Ramanand R', img: rampic, balance: 200 },
        { id: 102, name: 'Jithu Francis', img: jipic, balance: -500 },
    ]);


    function handleAddFriend() 
    {
        setViewFriendInp(true);
    }

    function handleFriendName(e) 
    {
        setFriendName(e.target.value);
    }

    /*Use URL.createObjectURL(file) for image files
    Get the uploaded file from e.target.files[0]
    Convert it into a previewable URL using URL.createObjectURL(file)*/


    function handleFriendImage(e) 
    {
        let imageFile = e.target.files[0];

        if (imageFile) 
        {
            setFriendImage(URL.createObjectURL(imageFile)); // create temporary image URL
        }

    }
    function handleAddNewFriend() 
    {
        if (friendName.trim() == '')
            return

        let alreadyExistingUser = users.some((ele => ele.name.toLowerCase() == friendName.toLowerCase()));

        if (alreadyExistingUser) 
        {
            alert(`Name ${friendName} Already Taken`);
            return;
        }

        let c = 
        {
            id: Math.trunc(Math.random() * 1000), name: friendName,
            img: friendImage, balance: 0
        };
        setUsers([...users, c]);
        console.log(c);
        setFriendImage(null);
        setFriendName('')
        setViewFriendInp(false);
    }

    function handleSplitBtn1(id) 
    {
        setSplitBtn1(true);
        let p = users.find((ele) => ele.id == id);
        setTotAmt(null);
        setMyExp(null);
        setFrndExp(null);
        setWhoPaid('');
        setSelectedUser(p);
    }

    function handleTotAmt(e)
    {
        setTotAmt(e.target.value);
    }

    function handleMyExp(e)
    {
        setMyExp(e.target.value);
    }

    function handleFrndExp(e)
    {
        setFrndExp(e.target.value);
    }

    function handleWhoPaid(e)
    {
        setWhoPaid(e.target.value);
        console.log(whoPaid);
    }

    function handleSplit(id)
    {
        if(totAmt === null && myExp === null && frndExp === null)
        {
            setSplitBtn1(true);
            return
        }
        setSplitBtn1(false);
        let friendId = users.find((ele => ele.id === id));

        if(Number(totAmt) !== Number(myExp) + Number(frndExp))
        {
            alert('Split Not Applicable, Enter Valid Amounts');
            setTotAmt(null);
            setMyExp(null);
            setFrndExp(null);
            setWhoPaid('');
            return;
        }

        if(whoPaid === 'Arjun Kumar')
        {
            friendId.balance = friendId.balance + Number(frndExp);
        }
        else
        {
            friendId.balance = friendId.balance - Number(myExp);
        }
        setTotAmt(null);
        setMyExp(null);
        setFrndExp(null);
        setWhoPaid('');
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-info nav">
                <div className="container-fluid">
                    <a href='#' className="navbar-brand ms-5 fs-3 fw-bold">🍉 Eat & Go</a>
                </div>
            </nav>

            <section className="container-fluid mt-5">
                <div className="row">
                    <div className="col-6 ">
                        <div className="card">
                            <table className="table rounded-3">
                                <tbody>
                                    {
                                        users.map((ele) => {
                                            let oweStatus = '';
                                            if (ele.balance < 0) 
                                            {
                                                oweStatus = 'I_OWE';
                                            } 
                                            else if (ele.balance > 0) 
                                            {
                                                oweStatus = 'U_OWE';
                                            } 
                                            else 
                                            {
                                                oweStatus = 'NO_OWE';
                                            }

                                            return (
                                                <tr key={ele.id}>
                                                    <td>
                                                        <img className="img1" src={ele.img} alt="Image Not Displayed" />
                                                    </td>
                                                    <td className="text-center fs-2 align-middle me-3 text-primary">
                                                        {ele.name}
                                                        {oweStatus === 'NO_OWE' && (
                                                            <h6 className="mt-2 text-dark opacity-50">Me and {ele.name} Owes Nothing</h6>
                                                        )}
                                                        {oweStatus === 'U_OWE' && (
                                                            <h6 className="mt-2 text-success">{ele.name} Owes Me ${ele.balance}</h6>
                                                        )}
                                                        {oweStatus === 'I_OWE' && (
                                                            <h6 className="mt-2 text-danger">I Owe {ele.name} ${Math.abs(ele.balance)}</h6>
                                                        )}
                                                    </td>
                                                    <td className="text-center fs-3 align-middle me-3">
                                                        <button className="btn btn-me fs-4 bg-success text-white"
                                                            onClick={() => {handleSplitBtn1(ele.id)}}>Split</button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>

                        <div className="text-center mt-3">
                            {viewFriendInp ? (
                                <>
                                    <input type='text' className="form-control" placeholder="Enter Friend Name:"
                                        value={friendName} onChange={handleFriendName} />
                                    <input type='file' className="form-control mt-3" accept="image/*"
                                        onChange={handleFriendImage} />
                                    <button className="btn btn-me btn-danger mt-3 mb-2" onClick={handleAddNewFriend}>Add Friend</button>
                                </>) : (<button className="btn btn-me btn-danger mt-3 mb-2" onClick={handleAddFriend}>Add Friend</button>)
                            }
                        </div>
                    </div>
                    <div className="col-6">
                        {
                            splitbtn1 ? (<div className="card">
                                <h2 className="text-center text-primary mt-2 text-decoration-underline">Split with {selectedUser.name}</h2>
                                <div className="container-fluid">
                                    <input type="text" className="form-control mt-3" placeholder="Enter Total Amount Spent" 
                                    value={totAmt} onChange={handleTotAmt}/>
                                    <input type="text" className="form-control mt-3" placeholder="Enter Your Expense" 
                                    value={myExp} onChange={handleMyExp}/>
                                    <input type="text" className="form-control mt-3" placeholder="Your Friend's Expense" 
                                    value={frndExp} onChange={handleFrndExp}/>
                                    <h4 className="fs-4 text-danger mt-3 text-center">Who Paid the Bill ?</h4>
                                    <select className="form-control mt-3" value={whoPaid} onChange={handleWhoPaid}>
                                        <option>---Select---</option>
                                        <option onChange={handleWhoPaid} name="Arjun Kumar">Arjun Kumar</option>
                                        <option onChange={handleWhoPaid} name={selectedUser.name}>{selectedUser.name}</option>
                                    </select>
                                    <div className="text-center">
                                        <button className="btn btn-me fs-5 mt-3 mb-2 bg-dark text-white" onClick={() => {handleSplit(selectedUser.id)}}>Split Bill</button>
                                    </div>
                                </div>
                            </div>) : null
                        }
                    </div>
                </div>
            </section>
        </>
    );
}