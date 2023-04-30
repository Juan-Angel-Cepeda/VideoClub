const supertest = require('supertest');
const app = require('../app');

describe("Probar el sistema de autenticación",()=>{
    it("debería de obtener un login con un user y password correctos",(done)=>{
        supertest(app).post("/login")
                      .send({
                        'email':'jangelcepeda@protonmail.com',
                        'password':'videoclub'
                      })
                      .expect(200)
                      .end(function(err,res){
                        if(err){
                            done(err);
                        }else{
                            done();
                        }
        });
    });
    it("debería de obtener un login con user y password incorrectos",(done)=>{
        supertest(app).post("/login")
        .send({
            "email":"luramirez@uach.mx",
            "password":"abcd"
        })
        .expect(403)
        .end(function(err,res){
            if(err){
                done(err)
            }else{
                done()
            }
        })

    })
});
