'use client'
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Head from 'next/head';

export default function Home() {
  const [names, setNames] = useState<any[]>(() => 
      [
        // { name: "John Doe", score: 0 },
        // { name: "Jane Smith", score: 0 },
        // { name: "Mark Johnson", score: 0 },
      ]
    );
  
  const [newName, setNewName] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const addName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newName === "") return;
    setNames((prevNames) => {
      const updatedNames = [...prevNames, { name: newName, score: 0 }];
      setNewName(""); // Clear the input field
      return updatedNames;
    });
  };

  const removeName = (index: number) => {
    console.log("removeName", index);
    setNames((prevNames) => {
      console.log(prevNames);
      prevNames.splice(index, 1);
      const updatedNames = [...prevNames];
      return updatedNames;
    });
  };

  const incrementScore = (index: number) => {
    console.log("incrementScore", index);
    setNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index].score += 1;
      return updatedNames;
    });
    sortList();
  };

  const decrementScore = (index: number) => {
    setNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index].score -= 1;
      return updatedNames;
    });
    sortList();
  };

  const sortList = () => {
    setNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames.sort((a, b) => {
        return b.score - a.score;
      });
      return updatedNames;
    });
  };

  const renderList = () => {
    const closeChar = String.fromCharCode(0x2715);
    return names.map((item, index) => (
      <li key={index} className="list-group-item">
        <div className="row">
          <div className="col-3" />
          <div className="col-3"><h2>{item.name}</h2></div>

          <div className="col-1"><h2>{item.score}</h2></div>
          <div className="col-3">
            <div className="ms-3 btn-group shadow-0" role="group">
              <button
                onClick={() => decrementScore(index)}
                type="button"
                className="btn btn-primary"
              >
                -
              </button>
              <button
                onClick={() => incrementScore(index)}
                type="button"
                className="btn btn-primary"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeName(index)}
              type="button"
              className="btn-danger ms-2"
            >
              {closeChar}
            </button>
          </div>
          <div className="col-2" />
        </div>
      </li>
    ));
  };

  useEffect(() => {
    const cachedList = localStorage.getItem("names");
    if (cachedList) {
      setNames(JSON.parse(cachedList));
    }
  }, []);

  useEffect(() => {
    console.log("useEffect");
    localStorage.setItem("names", JSON.stringify(names));
  }, [names]);

  return (
    <div>
      <form className="mt-5" onSubmit={addName}>
        <div className="row">
          <div className="col-3" />
          <div className="col">
            <div className="form-outline mb-4">
              <input
                type="text"
                id="name"
                className="form-control"
                onChange={handleNameChange}
                value={newName}
              />
              <label className="form-label">Name</label>
            </div>
          </div>
          <div className="col">
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Add"
            />
          </div>
          <div className="col-3" />
        </div>
      </form>

      <div className="container">
        <ul className="list-group list-group-light list-group-small">
          {renderList()}
        </ul>
      </div>
    </div>
  );
}
