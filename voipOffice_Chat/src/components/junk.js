<h1>{this.props.dataFromParent}</h1>
<ManageApp dataFromParent = {mainUser[0]}/>
<button onClick={() => new ManageApp(mainUser[0])}>Add contact</button>
<button onClick={() => new ManageApp(mainUser[0])}>Add contact</button>


<form id= "addcontact" onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} name="name" onChange={this.handleChange} />
          GuestNumber:
          <input type="text" value={this.state.value} name="number" onChange={this.handleChange} />
          <input type="text" value={this.state.value} name="phonenumber" onChange={this.props.dataFromParent} />
        </label>
        <input type="submit" value="Submit" />
      </form>



render() {
    return (
    	<div id="myDIV">
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} name="name" onChange={this.handleChange} />
          GuestNumber:
          <input type="text" value={this.state.value} name="number" onChange={this.handleChange} />
          <input type="text" value={this.state.value} name="phonenumber" onChange={this.props.dataFromParent} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }


  <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Phone Number</p>
          <input type="text" onChange={e => setPhonenumber(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          <p>Confirm Password</p>
          <input type="text" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>



 <Route path="/login">
            <Login setToken={settoken}/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/dashboard">
            <Dashboard user={token}/>
          </Route>