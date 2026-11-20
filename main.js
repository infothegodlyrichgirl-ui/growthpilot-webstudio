/* GrowthPilot Digital Solutions - shared script. Every feature checks that its elements exist, so one file is safe on every page. */
(function(){
"use strict";
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var CONFIG={formEndpoint:"https://formspree.io/f/mzeekkvy",email:"infogrowthpilotwebstudio@gmail.com"};
/* mobile menu */
var btn=$(".menu-btn"),nav=$("#site-nav");
if(btn&&nav){btn.addEventListener("click",function(){var o=nav.classList.toggle("open");btn.setAttribute("aria-expanded",o)});
$$("a",nav).forEach(function(a){a.addEventListener("click",function(){nav.classList.remove("open");btn.setAttribute("aria-expanded","false")})});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){nav.classList.remove("open");btn.setAttribute("aria-expanded","false")}})}
/* highlight current page */
var here=(location.pathname.split("/").pop()||"index.html");
$$(".site-nav a").forEach(function(a){if(a.getAttribute("href")===here&&!a.classList.contains("btn"))a.setAttribute("aria-current","page")});
/* footer year */
$$("[data-year]").forEach(function(el){el.textContent=new Date().getFullYear()});
/* scroll reveal */
var els=$$(".rv");
if("IntersectionObserver"in window&&els.length){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(el){io.observe(el)})}
else els.forEach(function(el){el.classList.add("in")});
/* enquiry form (only on pages that have it) */
var form=$("#enquiry-form");
if(form){
var status=$("#form-status"),submit=$("button[type=submit]",form);
var rules={name:"Please enter your name.",email:"Please enter a valid email address.",service:"Please choose a service.",message:"Please describe your project."};
var val=function(n){var f=form.elements[n];return f?f.value.trim():""};
var setErr=function(n,m){var e=$("#e_"+n);if(e)e.textContent=m};
form.addEventListener("submit",function(ev){ev.preventDefault();
if(val("_gotcha")){return}
var bad=false;Object.keys(rules).forEach(function(k){var v=val(k),m="";if(k==="email"?!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v):!v)m=rules[k];setErr(k,m);if(m)bad=true});
if(bad){status.textContent="Please check the highlighted fields.";return}
submit.disabled=true;status.textContent="Sending your enquiry...";
var data={_subject:"Project enquiry - GrowthPilot Digital Solutions",name:val("name"),email:val("email"),organisation:val("organisation"),service:val("service"),budget:val("budget"),message:val("message")};
fetch(CONFIG.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(data)})
.then(function(r){if(!r.ok)throw new Error("fail");status.textContent="Thank you. Your enquiry has been sent and we will be in touch soon.";form.reset()})
.catch(function(){status.textContent="Sorry, we could not send your enquiry. Please email "+CONFIG.email+" or message us on WhatsApp."})
.then(function(){submit.disabled=false})})}
})();
