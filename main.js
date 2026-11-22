/* GrowthPilot Digital Solutions - shared script. Every feature checks that its elements exist, so one file is safe on every page. */
(function(){
"use strict";
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var CONFIG={formEndpoint:"https://formspree.io/f/mzeekkvy",email:"infogrowthpilotwebstudio@gmail.com",whatsapp:"256781824421"};
/* Allowed values for ?service= and ?package= links. Anything not listed here is ignored. */
var SVC={starter:"Starter Website",business:"Business Website",premium:"Premium Website",ecommerce:"E-commerce Website","basic-app":"Basic Web Application","business-system":"Business Management System","advanced-app":"Advanced Custom Application","api-automation":"API Integration & Automation",maintenance:"Website Maintenance",custom:"Custom Project",tophora:"Tophora Enquiry",other:"Other"};
var PKG={starter:["Starter Website","UGX 350,000"],business:["Business Website","UGX 650,000"],premium:["Premium Website","UGX 1,200,000"],ecommerce:["E-commerce Website","From UGX 2,000,000"],"basic-app":["Basic Web Application","From UGX 2,000,000"],"business-system":["Business Management System","From UGX 3,500,000"],"advanced-app":["Advanced Custom Application","Custom quotation"],"api-automation":["API Integration & Automation","Custom quotation"],"care-basic":["Basic Care","UGX 50,000 / month"],"care-business":["Business Care","UGX 100,000 / month"],"care-premium":["Premium Care","UGX 200,000 / month"],custom:["Custom Project","Custom quotation"]};
function has(o,k){return Object.prototype.hasOwnProperty.call(o,k)}
function keyFor(map,q){if(!q)return null;if(has(map,q))return q;var lq=String(q).toLowerCase();for(var k in map){if(has(map,k)){var l=Array.isArray(map[k])?map[k][0]:map[k];if(l.toLowerCase()===lq)return k}}return null}
function resolve(search){var p=new URLSearchParams(search||"");return{service:keyFor(SVC,p.get("service")),pkg:keyFor(PKG,p.get("package"))}}
function priceOf(label){for(var k in PKG){if(has(PKG,k)&&PKG[k][0]===label)return PKG[k][1]}return ""}
if(typeof module==="object"&&module.exports)module.exports={resolve:resolve,SVC:SVC,PKG:PKG,priceOf:priceOf};
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
var status=$("#form-status"),submit=$("button[type=submit]",form),box=$("#selection"),busy=false;
var val=function(n){var f=form.elements[n];return f?String(f.value).trim():""};
var setErr=function(n,m){var e=$("#e_"+n);if(e)e.textContent=m};
function summary(){if(!box)return;var pk=val("package"),sv=val("service"),name=pk||sv;if(!name){box.hidden=true;return}
var price=priceOf(name);box.textContent="";var b=document.createElement("b");b.textContent=name;
box.appendChild(document.createTextNode(pk?"Selected package: ":"Selected service: "));box.appendChild(b);
box.appendChild(document.createTextNode(price?" \u2014 "+price+". Prices are starting prices. ":". "));box.appendChild(document.createTextNode("You can change your selection below."));box.hidden=false}
var pre=resolve(location.search);
if(pre.service&&form.elements.service)form.elements.service.value=SVC[pre.service];
if(pre.pkg&&form.elements.package)form.elements.package.value=PKG[pre.pkg][0];
summary();
["service","package"].forEach(function(n){if(form.elements[n])form.elements[n].addEventListener("change",summary)});
var rules={name:"Please enter your name.",email:"Please enter a valid email address.",service:"Please choose a service.",message:"Please describe your project."};
form.addEventListener("submit",function(ev){ev.preventDefault();
if(busy)return;if(val("_gotcha"))return;
var bad=false;Object.keys(rules).forEach(function(k){var v=val(k),m="";if(k==="email"?!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v):!v)m=rules[k];setErr(k,m);if(m)bad=true});
if(bad){status.textContent="Please check the highlighted fields.";return}
busy=true;submit.disabled=true;submit.setAttribute("aria-busy","true");var label=submit.textContent;submit.textContent="Sending...";status.textContent="";
var sv=val("service"),pk=val("package"),pr=priceOf(pk||sv);
var data={_subject:"Project enquiry - "+sv+(pk?" / "+pk:""),name:val("name"),email:val("email"),organisation:val("organisation"),phone:val("phone"),service:sv,package:pk,starting_price:pr,budget:val("budget"),preferred_contact:val("contact_method"),message:val("message")};
fetch(CONFIG.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(data)})
.then(function(r){if(!r.ok)throw new Error("fail");status.textContent="Thank you for contacting GrowthPilot Digital Solutions! Your project enquiry has been submitted successfully. Our team will review your requirements and get back to you.";form.reset();summary()})
.catch(function(){status.textContent="We couldn\u2019t submit your enquiry at this time. Please try again or contact us through ";var a=document.createElement("a");a.href="https://wa.me/"+CONFIG.whatsapp;a.textContent="WhatsApp";status.appendChild(a);status.appendChild(document.createTextNode("."))})
.then(function(){busy=false;submit.disabled=false;submit.removeAttribute("aria-busy");submit.textContent=label})})}
})();
