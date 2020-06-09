import React from 'react';
import fire from './config/fire';
import firebase, { auth, provider } from "./config/fire";
// import ScriptTag from 'react-script-tag';

// logout=()=>{
//   fire.auth().signOut();
// }

// componentDidMount(){



class Home extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      nav_pages_id:['HOME','INBOX','MESSAGES','COMPOSE','EVENTS','SEARCH','GALLERY','PROFILE'],
      did:'00',
      dbatch:"2020",
      dbranch:"science",
      dcurrentStatus:"0 year",
      ddesc:"Hello! MEC",
      dname:"Student",

      userId:"0", //db user id
      isLoaded:false, //load status for above items

      posts:"null",
      noOfPosts:"0",
      postsLoaded:false,

      myPosts:"0",
      myPostsLoaded:false,
      noOfMyPosts:"0",

      upComingEvents:"null",
      eventsLoaded:false,
  };
  };
//////////////////////DATABASE CONNECTIVITY//////////

componentDidMount() {
  var currentComponent = this;
  // AUTH
  auth.onAuthStateChanged(user => {
    if (user) {
      var userid = firebase.auth().currentUser.uid;
      currentComponent.setState({userId:userid});
      firebase.database().ref('/users/' + userid).once('value').then((snapshot)=> {
        currentComponent.setState({dname: (snapshot.val() && snapshot.val().name) || 'Anonymous'});
        currentComponent.setState({ddesc: (snapshot.val() && snapshot.val().desc) || 'Anonymous'});
        currentComponent.setState({dcurrentStatus: (snapshot.val() && snapshot.val().currentStatus) || 'Anonymous'});
        currentComponent.setState({dbranch: (snapshot.val() && snapshot.val().branch) || 'Anonymous'});
        currentComponent.setState({dbatch: (snapshot.val() && snapshot.val().batch) || 'Anonymous'});
        currentComponent.setState({did: (snapshot.val() && snapshot.val().ID) || 'Anonymous'});
        currentComponent.setState({isLoaded:true});

        if(currentComponent.state.isLoaded==true){
          document.getElementById("greeting").innerHTML="Hi, "+currentComponent.state.dname;
        } 
      }); 

      firebase.database().ref('/events/upcoming').once('value').then((snapshot)=>{
        currentComponent.setState({upComingEvents:(snapshot.val())})
        currentComponent.setState({eventsLoaded:true});
        if(currentComponent.state.eventsLoaded==true){
          console.log("here");
          console.log(currentComponent.state.upComingEvents);
        }

      })

      firebase.database().ref('/posts/allposts').once('value').then((snapshot)=> {
        //var p=(snapshot.val()); //p=all posts list
        currentComponent.setState({posts:(snapshot.val())})
        currentComponent.setState({postsLoaded:true});
        if(currentComponent.state.postsLoaded==true){
          var pLen=Object.keys(currentComponent.state.posts).length;
          currentComponent.setState({noOfPosts:pLen})
          // console.log(currentComponent.state.noOfPosts);
        } 
      });

      firebase.database().ref('/users/'+firebase.auth().currentUser.uid+'/myPosts/').once('value').then((snapshot)=> {
        //var p=(snapshot.val()); //p=all posts list
        currentComponent.setState({myPosts:(snapshot.val())})
        currentComponent.setState({myPostsLoaded:true});
        if(currentComponent.state.myPostsLoaded==true){
          var pLen=Object.keys(currentComponent.state.posts).length;
          currentComponent.setState({noOfMyPosts:pLen})
          //  console.log(currentComponent.state.noOfPosts);
        } 
      });

    

    }
  });




}

composePost=()=>{
  var c=document.getElementById("writePost").innerHTML;
  console.log(c);
  // var postListRef=firebase.database().ref('/posts/allposts/')
  var newPostRef = firebase.database().ref('/posts/allposts/').push();
  var newPostRefProfile = firebase.database().ref('/users/'+firebase.auth().currentUser.uid+'/myPosts/').push();

  newPostRef.set({
  content:c,
  name:this.state.dname,
  time:"dwd",
  userid:this.state.userId,
});

newPostRefProfile.set({  //this is to add post in users profile page
  content:c,
  time:"dwd",
});

window.location.reload(false);
}


  //////////////EXTERNAL JS FUNCTIONS////////////

  nav_open=()=>{
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  }
 
  nav_close=()=> {
      document.getElementById("mySidebar").style.display = "none";
      document.getElementById("myOverlay").style.display = "none";
  }


  nav_page=(pageid)=>{
    // console.log("bbiukh");
    this.nav_close();
    // alert("inside nav page");
    for (var d in this.state.nav_pages_id) {
      if (this.state.nav_pages_id[d] != pageid) {
        document.getElementById(this.state.nav_pages_id[d]).style.display = 'none';
      } 
      else {
        document.getElementById(pageid).style.display="block";
      }
    }
  }


open_message=(x)=>{
  document.getElementById('INBOX').style.display="none";
  document.getElementById('MESSAGES').style.display="block";
}

send_reply=(x)=>{
  document.getElementById('MESSAGES').style.display="none";
  document.getElementById('COMPOSE').style.display="block";
}

send_message=(x)=>{
  document.getElementById('COMPOSE').style.display="none";
  document.getElementById('INBOX').style.display="block";
}

 message_me=(x)=>{
  // document.getElementById('SEARCH').style.display="none";
  // document.getElementById('COMPOSE').style.display="block";
}

///////RENDER////////////////


  
  render() {

    let card = []; //card=html code for all posts in home page 
    //console.log(this.state.dbatch);
    if(this.state.postsLoaded==true){
      var no=this.state.noOfPosts;
      var keys=Object.keys(this.state.posts)
      // console.log(keys);
      var i=no;
      while(i>=1)
      {
        card.push(<div className="w3-container w3-card w3-white w3-round w3-margin"><br />
            {/* <img src="/w3images/avatar5.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width: '60px'}} /> */}
            <span className="w3-right w3-opacity">just now</span>
            <h4>{this.state.posts[keys[i-1]]['name']}</h4><br />
            <hr className="w3-clear" />
            <p>{this.state.posts[keys[i-1]]['content']}.</p>
            <button type="button" onclick="like(this)" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up" /> &nbsp;Like</button> 
            <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment" /> &nbsp;Comment</button> 
        </div> );
        i--;
      }
    }

    var mycard=[]; //mycards=html for posts in my profile page

    if(this.state.myPostsLoaded==true){
      // console.log(this.state.myPosts);
      var no2=this.state.noOfPosts;
      var keys2=Object.keys(this.state.myPosts)
      // console.log(keys2);
      var i2=no2;
      while(i2>=1)
      {
        mycard.push(<div className="w3-container w3-card w3-white w3-round w3-margin">
            {/* <img src="/w3images/avatar5.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width: '60px'}} /> */}
            <span className="w3-right w3-opacity">just now</span>
            {/* <h4>{this.state.myPosts[keys2[i2-1]]['name']}</h4><br /> */}
            {/* <hr className="w3-clear" /> */}
            <p>{this.state.myPosts[keys2[i2-1]]['content']}.</p>
            {/* <button type="button" onclick="like(this)" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up" /> &nbsp;Like</button> 
            <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment" /> &nbsp;Comment</button>  */}
            </div> );
        i2--;
      }
    }  

    var eventCard=[]; //mycards=html for posts in my profile page

    if(this.state.eventsLoaded==true){
      console.log("inside if events")
      var no3=this.state.upComingEvents.length-1;
      var keys3=Object.keys(this.state.upComingEvents)
      console.log(keys3);
      var i3=no3;
      while(i3>=1)
      {
        eventCard.push(<div>
          <br />
          <h5>{this.state.upComingEvents[keys3[i3-1]]['name']}</h5>
           <p>{this.state.upComingEvents[keys3[i3-1]]['date']}</p>
          <br />
          <hr />
        </div> );
        i3--;
      }
      console.log(eventCard);
    }  



    return (
      // <div style={{textAlign: 'center'}}>
      //   <h1>You Are Logged In</h1>
      //   <button onClick = {this.logout}>Logout</button>
      // </div>
      <div>
        {/* {console.log("in div")} */}
              {this.nav_page.bind(this,'HOME')}

        <title>ALUMNI</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <style dangerouslySetInnerHTML={{__html: "\nbody,h1,h2,h3,h4,h5,h6 {font-family: \"Raleway\", sans-serif}\n.sticky{\n  position:fixed;\n  top:0;\n}\n.header{\n  background-color:skyblue;\n  width:100%;\n  height: 5%;\n}\n.search {\n  width: 80%;\n  background-color: white;\n  font-size: 16px;\n  margin-left: 10%;\n  margin-right:10%;\n  padding: 12px ;\n  border-radius: 20px;\n}\n\n/* for image slider on events */\n* {box-sizing: border-box}\nbody {font-family: Verdana, sans-serif; margin:0}\n.mySlides {display: none}\nimg {vertical-align: middle;}\n\n/* Slideshow container */\n.slideshow-container {\n  max-width: 1000px;\n  position: relative;\n  margin: auto;\n  max-height: 30%;\n}\n\n/* Next & previous buttons */\n.prev, .next {\n  cursor: pointer;\n  position: absolute;\n  top: 50%;\n  width: auto;\n  padding: 16px;\n  margin-top: -22px;\n  color: white;\n  font-weight: bold;\n  font-size: 18px;\n  transition: 0.6s ease;\n  border-radius: 0 3px 3px 0;\n  user-select: none;\n}\n\n/* Position the \"next button\" to the right */\n.next {\n  right: 0;\n  border-radius: 3px 0 0 3px;\n}\n\n/* On hover, add a black background color with a little bit see-through */\n.prev:hover, .next:hover {\n  background-color: rgba(0,0,0,0.8);\n}\n\n/* Caption text */\n.text {\n  color: #f2f2f2;\n  font-size: 15px;\n  padding: 8px 12px;\n  position: absolute;\n  bottom: 8px;\n  width: 100%;\n  text-align: center;\n}\n\n/* Number text (1/3 etc) */\n.numbertext {\n  color: #f2f2f2;\n  font-size: 12px;\n  padding: 8px 12px;\n  position: absolute;\n  top: 0;\n}\n\n/* The dots/bullets/indicators */\n.dot {\n  cursor: pointer;\n  height: 15px;\n  width: 15px;\n  margin: 0 2px;\n  background-color: #bbb;\n  border-radius: 50%;\n  display: inline-block;\n  transition: background-color 0.6s ease;\n}\n\n.active, .dot:hover {\n  background-color: #717171;\n}\n/* On smaller screens, decrease text size */\n@media only screen and (max-width: 300px) {\n  .prev, .next,.text {font-size: 11px}\n}\n\n/* Style tab links */\n.tablink {\n  background-color: #F8F8F8;\n  float: left;\n  border: none;\n  outline: none;\n  padding: 15px;\n  font-size: 17px;\n  width: 50%;\n}\n\n/* Style the tab content (and add height:100% for full page content) */\n.tabcontent {\n  display: none;\n  padding: 50px 20px;\n}\n\n" }} />
        {/* Sidebar/menu */}
        <div className="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left" style={{zIndex: 3, width: '220px'}} id="mySidebar">
          <a href="#" className="w3-bar-item w3-button w3-border-bottom w3-hover-blue w3-padding-16" onClick={this.nav_page.bind(this,'HOME')}><i className="fa fa-home" />   HOME</a>
          <a href="#" className="w3-bar-item w3-button w3-border-bottom w3-hover-blue w3-padding-16" onClick={this.nav_page.bind(this,'INBOX')}><i className="fa fa-envelope" />   MESSAGES</a>
          <a href="#" className="w3-bar-item w3-button w3-border-bottom w3-hover-blue w3-padding-16" onClick={this.nav_page.bind(this,'EVENTS')}><i className="fa fa-calendar-o" />   EVENTS</a>
          <a href="#" className="w3-bar-item w3-button w3-border-bottom w3-hover-blue w3-padding-16" onClick={this.nav_page.bind(this,'SEARCH')}><i className="fa fa-search" />   SEARCH</a>
          <a href="#" className="w3-bar-item w3-button w3-border-bottom w3-hover-blue w3-padding-16" onClick={this.nav_page.bind(this,'GALLERY')}><i className="fa fa-camera" />   GALLERY</a>
          <a href="#" className="w3-bar-item w3-button w3-border-bottom w3-hover-blue w3-padding-16" onClick={this.nav_page.bind(this,'PROFILE')}><i className="fa fa-user-circle-o" />   PROFILE</a>
        </div>
        {/* Overlay effect when opening sidebar on small screens */}
        <div className="w3-overlay w3-hide-large w3-animate-opacity" onclick="nav_close()" style={{cursor: 'pointer'}} title="close side menu" id="myOverlay" />
        {/* Header */}
        <div className="header" id="portfolio" style={{zIndex: 1}}>
          <div onclick="nav_open()">
            <i className="fa fa-bars" style={{fontSize: '36px', color: 'white', padding: '5px'}} />
          </div>
        </div>
        {/* !HOME PAGE CONTENT! */}
        <div className="w3-main" id="HOME" style={{marginLeft: '225px', display: 'block'}}>
          <h1 textalign="center" ><b id="greeting">Hi, </b></h1>
          <div className="w3-row-padding">
            <div className="w3-col m12">
              <div className="w3-card w3-round w3-white">
                <div className="w3-container w3-padding">
                  <p id="writePost" contentEditable="true" className="w3-border w3-padding" placeholder="What's in your mind?" ></p>
                  <button id="sendPost" type="button" className="w3-button w3-theme" onClick={this.composePost.bind(this)}><i className="fa fa-pencil" /> &nbsp;Post</button> 
                </div>
              </div>
            </div>
          </div>
          {/* First Photo Grid*/}
          <div className="w3-row-padding" id="post">
            {card}
          </div>
         
        </div>
        {/* End HOME page*/}
        {/* !MESSAGE PAGE CONTENT! */}
        {/*INBOX*/}
        <div className="w3-main" id="INBOX" style={{marginLeft: '225px', display: 'none'}}>
          <div>
            <br /><br />
            <input type="text" className="search" placeholder="Search.." /><br /><br />
          </div>
          <button type="button" className="w3-button w3-theme" style={{marginLeft: '40%'}} onClick={this.nav_page.bind(this,'COMPOSE')}><i className="fa fa-pencil-square-o" />  COMPOSE</button>
          <br /><br />
          <div className="w3-row-padding">
            <div className="w3-card w3-round w3-white" id="chat" onClick={this.open_message.bind(this,0)}>
              <div className="w3-container">
                <h5>NAME</h5>
                <p>SUBJECT GOES HERE</p>
                <span className="w3-right w3-opacity">11:45</span>
                <br />
              </div>
            </div>
            <br />
            <div className="w3-card w3-round w3-white" id="chat" onClick={this.open_message.bind(this,1)}>
              <div className="w3-container">
                <h5>NAME</h5>
                <p>SUBJECT</p>
                <span className="w3-right w3-opacity">11:45</span>
                <br />
              </div>
            </div>
            <br />
            <div className="w3-card w3-round w3-white" id="chat" onClick={this.open_message.bind(this,2)}>
              <div className="w3-container">
                <h5>NAME</h5>
                <p>SUBJECT</p>
                <span className="w3-right w3-opacity">11:45</span>
                <br />
              </div>
            </div>
          </div>
        </div>
        {/*MESSAGE VIEW*/}
        <div className="w3-main" id="MESSAGES" style={{marginLeft: '225px', display: 'none'}}>
          <div className="w3-container" style={{backgroundColor: 'skyblue', color: 'white'}}>
            <br />
            <img src="/w3images/avatar2.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width: '60px'}} />
            <span className="w3-right w3-opacity">12/3/2020</span>
            <br />
            <span className="w3-right w3-opacity">11:41 pm</span>
            <h4>John Doe</h4>
            <hr />
            <p> SUBJECT COMES HERE </p><p>
            </p></div>
          <br />
          <div className="w3-row-padding">
            <div className="w3-card w3-round w3-white">
              <div className="w3-container">
                <br />
                <p>message text........some thing Top email providers which are free include Gmail, Yahoo, Outlook, AOL, Zoho, Mail.Com, and ProtonMail. 
                  Email providers which are more secure than the others are ProtonMail, CounterMail, Hushmail, and Tutanota.
                  Some webmail clients which provide paid services include Zoho, Gmail, Hushmail, and ProtonMail.</p>
                <br />
              </div>
            </div>
            <br />
            <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom" onclick="nav_page('INBOX')"><i className="fa fa-reply" /> &nbsp;BACK</button> 
            <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom" onClick={this.send_reply.bind(this,0)}><i className="fa fa-envelope-open" /> &nbsp;REPLY</button>
          </div>
        </div>
        {/*COMPOSE*/}
        <div className="w3-main" id="COMPOSE" style={{marginLeft: '225px', display: 'none'}}>
          <div className="w3-row-padding">
            <div className="w3-card w3-round w3-white">
              <div className="w3-container">
                {/* <br />
                <div>
                  <label htmlFor="to">TO..</label>
                  <input type="text" id="to" placeholder="enter name or mail id" style={{width: '80%', padding: '5px'}} />
                </div>
                <br />
                <div>
                  <label htmlFor="sub">SUB</label>
                  <input type="text" id="sub" placeholder="enter subject" style={{width: '80%', padding: '5px'}} />
                </div>
                <br />
                <div>
                  <textarea id="mes" placeholder="type your message here.." style={{height: '200px', width: '100%'}} defaultValue={""} />
                </div>
                <br /> */}
{/* formmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm */}
             
                <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom" onclick="nav_page('INBOX')"><i className="fa fa-trash" /> DISCARD</button> 
                <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom" onClick={this.send_message.bind(this,0)}><i className="fa fa-send" /> SEND</button>
              </div>
            </div>
            <br />
          </div>
        </div>
        <br />
        {/* End MESSAGE page */}
        {/* !EVENTS PAGE CONTENT! */}
        <div className="w3-main" id="EVENTS" style={{marginLeft: '225px', display: 'none'}}>
          {/*slideshow*/}
          <div className="slideshow-container">
            <div className="mySlides fade">
              <div className="numbertext">1 / 3</div>
              <img src="/mountains_1.jpg" style={{width: '100%'}} />
              <div className="text">Caption Text</div>
            </div>
            <div className="mySlides fade">
              <div className="numbertext">2 / 3</div>
              <img src="/img_snow_wide3.jpg" style={{width: '100%'}} />
              <div className="text">Caption Two</div>
            </div>
            <div className="mySlides fade">
              <div className="numbertext">3 / 3</div>
              <img src="/img_mountains_wide.jpg" style={{width: '100%'}} />
              <div className="text">Caption Three</div>
            </div>
            <a className="prev" onclick="plusSlides(-1)">❮</a>
            <a className="next" onclick="plusSlides(1)">❯</a>
          </div>
          <br />
          <div style={{textAlign: 'center'}}>
            <span className="dot" onclick="currentSlide(1)" /> 
            <span className="dot" onclick="currentSlide(2)" /> 
            <span className="dot" onclick="currentSlide(3)" /> 
          </div>
          <br /><br />
          {/*upcomming events*/}
          <div className="w3-card w3-round w3-white">
            <br /><h4 style={{textAlign: 'center'}}> - UPCOMING EVENTS - </h4><br />
          </div>
          {eventCard}
          {/* <div>
            <br />
            <h5>EVENT NAME</h5>
            <p>something about event like place time organizer ete etc </p>
            <br />
            <hr />
          </div> */}
        </div>
        {/* End EVENTS page */}
        {/* !SEARCH PAGE CONTENT! */}
        <div className="w3-main" id="SEARCH" style={{marginLeft: '225px', display: 'none'}}>
          <div>
            <br /><br />
            <input type="text" className="search" placeholder="Search.." /><br /><br /><br />
          </div>
          <div className="w3-row-padding">
            <div className="w3-third w3-container w3-margin-bottom">
              <div className="w3-card w3-round w3-white">
                <div className="w3-container">
                  <p className="w3-center"><img src="/w3images/avatar3.png" className="w3-circle" style={{height: '106px', width: '106px'}} alt="Avatar" /></p>
                  <hr />
                  <h4 className="w3-center">{this.state.dname}</h4>
                  {/* <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme" />{}</p> */}
                  <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme" />{this.state.dcurrentStatus}</p>
    <             p>{this.state.ddesc}</p>
                  <div style={{display: 'flex', justifyContent: 'center'}} onClick={this.message_me(this,0)}><button>MESSAGE ME</button></div>
                  <br />
                </div>
              </div>
            </div>
            <div className="w3-third w3-container w3-margin-bottom">
              <div className="w3-card w3-round w3-white">
                <div className="w3-container">
                  <p className="w3-center"><img src="/w3images/avatar3.png" className="w3-circle" style={{height: '106px', width: '106px'}} alt="Avatar" /></p>
                  <hr />
                  <h4 className="w3-center">MY NAME</h4>
                  <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme" /> Designer, UI</p>
                  <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme" /> London, UK</p>
                  <p>Description of mine.....some paragraph smbv,dfhvjkdf. bvdfjbkdbdjfbakhgvfdz</p>
                  <div style={{display: 'flex', justifyContent: 'center'}} onClick={this.message_me(this,0)}><button>MESSAGE ME</button></div>
                  <br />
                </div>
              </div>
            </div>
            <div className="w3-third w3-container w3-margin-bottom">
              <div className="w3-card w3-round w3-white">
                <div className="w3-container">
                  <p className="w3-center"><img src="/w3images/avatar3.png" className="w3-circle" style={{height: '106px', width: '106px'}} alt="Avatar" /></p>
                  <hr />
                  <h4 className="w3-center">MY NAME</h4>
                  <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme" /> Designer, UI</p>
                  <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme" /> London, UK</p>
                  <p>Description of mine.....some paragraph smbv,dfhvjkdf. bvdfjbkdbdjfbakhgvfdz</p>
                  <div style={{display: 'flex', justifyContent: 'center'}} onClick={this.message_me(this,0)}><button>MESSAGE ME</button></div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End SEARCH page */}
        {/* !GALLERY PAGE CONTENT! */}
        <div className="w3-main" id="GALLERY" style={{marginLeft: '225px', display: 'none'}}>
          <div className="w3-row-padding">
            <div className="w3-third w3-container w3-margin-bottom">
              <div ></div>
            <a href="https://lh3.googleusercontent.com/E7qBQ1taTqePNg9krA0q_ua_RpTL16Ff4wIc-LlKbLsxRW495VbBEfRyLHdOvEaQGGvO5O2Ucd9BQHA4dthPtelzHMdb2HjUomg_aZRfoDPloPU0IiAfioDT8EUWQH2jc6T5-NCSYGA=w2400&source=labnol.org"> <img  src="https://lh3.googleusercontent.com/E7qBQ1taTqePNg9krA0q_ua_RpTL16Ff4wIc-LlKbLsxRW495VbBEfRyLHdOvEaQGGvO5O2Ucd9BQHA4dthPtelzHMdb2HjUomg_aZRfoDPloPU0IiAfioDT8EUWQH2jc6T5-NCSYGA=w600-h315-p-k" /> </a>
            <a href="https://lh3.googleusercontent.com/C-SSP4b-4x0WwOExn045pb-UdWJ8ZZYCfI29lVxSl5h_fziwz_dZl2KokRrJDpR-EQC7y9yf7BVTYiguYFnl-jL67371J1HP4B3Ph_4VvhrT2bBhhAjTsTZtYChpvU8JrFttvPCzdzk=w2400&source=labnol.org"> <img src="https://lh3.googleusercontent.com/C-SSP4b-4x0WwOExn045pb-UdWJ8ZZYCfI29lVxSl5h_fziwz_dZl2KokRrJDpR-EQC7y9yf7BVTYiguYFnl-jL67371J1HP4B3Ph_4VvhrT2bBhhAjTsTZtYChpvU8JrFttvPCzdzk=w600-h315-p-k" /> </a>
            <a href="https://lh3.googleusercontent.com/28eScqdJ6LeTgCM08Bwhr712v4rJYvs1LpO_E0cFXH_iFLI7gI1yqnsq6_pkuLnwDeXyPyFmVLwamEWV2MTwe6UvHltE1arWjC2RjfiS-wAFtfOdFNMuVGfFWmJD56WT9YodgooXMtk=w2400&source=labnol.org"> <img src="https://lh3.googleusercontent.com/28eScqdJ6LeTgCM08Bwhr712v4rJYvs1LpO_E0cFXH_iFLI7gI1yqnsq6_pkuLnwDeXyPyFmVLwamEWV2MTwe6UvHltE1arWjC2RjfiS-wAFtfOdFNMuVGfFWmJD56WT9YodgooXMtk=w600-h315-p-k" /> </a>
              {/* <img src="/w3images/lights.jpg" alt="Norway" style={{width: '100%'}} className="w3-hover-opacity" /> */}
          </div>
          </div>
          </div>
        {/* End GALLERY page */}
        {/* !PROFILE PAGE CONTENT! */}
        <div className="w3-main" id="PROFILE" style={{marginLeft: '225px', display: 'none'}}>
          <div className="w3-card w3-round w3-white">
            <div className="w3-container">
              {/* <p className="w3-center"><img src="/w3images/avatar3.png" className="w3-circle" style={{height: '106px', width: '106px'}} alt="Avatar" /></p> */}
              <hr />
              <h4 className="w3-center">{this.state.dname}</h4>
              {/* <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme" /> Designer, UI</p> */}
            <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme" /> {this.state.dcurrentStatus}</p>
            <p>{this.state.ddesc}</p>
            </div>
            <br /><hr />
            <div className="w3-container">
              <button className="tablink" onclick="openPage('POST', this, 'lightblue')" style={{backgroundColor: 'lightblue'}}>MY POSTS</button>
              {/* <button className="tablink" onclick="openPage('GROUP', this, 'lightblue')">GROUPS</button> */}
              <div id="POST" className="tabcontent" style={{display: 'block'}}>
    <div id="myPosts">{mycard}</div>
                {/* <h3>POSTS KEEPT THIS FOR UNDERSTANDING SHOULD REMOVE LATER</h3> */}
                {/* <div  className="w3-container w3-card w3-white w3-round w3-margin"><br /> */}
                  {/* <img src="/w3images/avatar2.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width: '60px'}} />
                  <span className="w3-right w3-opacity">1 min</span>
                  <h4>John Doe</h4><br />
                  <hr className="w3-clear" />
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <div className="w3-row-padding" style={{margin: '0 -16px'}}>
                    <div className="w3-half">
                      <img src="/w3images/lights.jpg" style={{width: '100%'}} alt="Northern Lights" className="w3-margin-bottom" />
                    </div>
                    <div className="w3-half">
                      <img src="/w3images/nature.jpg" style={{width: '100%'}} alt="Nature" className="w3-margin-bottom" />
                    </div>
                  </div>
                  <button type="button" onclick="like(this)" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up" /> &nbsp;Like</button> 
                  <button type="button" onclick="like(this)" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment" /> &nbsp;Comment</button>  */}
                {/* </div> */}
                {/* <div className="w3-container w3-card w3-white w3-round w3-margin"><br />
                  <img src="/w3images/avatar5.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width: '60px'}} />
                  <span className="w3-right w3-opacity">16 min</span>
                  <h4>Jane Doe</h4><br />
                  <hr className="w3-clear" />
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <button type="button" onclick="like(this)" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up" /> &nbsp;Like</button> 
                  <button type="button" onclick="like(this)" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment" /> &nbsp;Comment</button> 
                </div>   */}
              </div>
              <div id="GROUP" className="tabcontent">
                <h3>GROUPS</h3>
                <div className="w3-container w3-card w3-white w3-round w3-margin"><br />
                  <img src="/w3images/avatar2.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width: '60px'}} />
                  <span className="w3-right w3-opacity">1 min</span>
                  <h4>John Doe</h4><br />
                  <hr className="w3-clear" />
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <div className="w3-row-padding" style={{margin: '0 -16px'}}>
                    <div className="w3-half">
                      <img src="/w3images/lights.jpg" style={{width: '100%'}} alt="Northern Lights" className="w3-margin-bottom" />
                    </div>
                    <div className="w3-half">
                      <img src="/w3images/nature.jpg" style={{width: '100%'}} alt="Nature" className="w3-margin-bottom" />
                    </div>
                  </div>
                  <button type="button" onclick="like(this)" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up" /> &nbsp;Like</button> 
                  <button type="button" onclick="like(this)" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment" /> &nbsp;Comment</button> 
                </div>
                <div className="w3-container w3-card w3-white w3-round w3-margin"><br />
                  <img src="/w3images/avatar5.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width: '60px'}} />
                  <span className="w3-right w3-opacity">16 min</span>
                  <h4>Jane Doe</h4><br />
                  <hr className="w3-clear" />
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <button type="button" onclick="like(this)" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up" /> &nbsp;Like</button> 
                  <button type="button" onclick="like(this)" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment" /> &nbsp;Comment</button> 
                </div>  
              </div>
            </div>
            <br /><br />
          </div>
        </div>
        {/* End PROFILE page */}
      </div>
    );
    
  }
}

export default Home;