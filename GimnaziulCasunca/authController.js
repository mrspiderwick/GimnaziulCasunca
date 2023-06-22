const User = require('./models/User')
const Role = require('./models/Role')
const Elev = require('./models/Elev')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("./config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
} 

class authController{
    async registration(req, res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) { 
                return res.status(400).json({message: "A user with the same name already exists"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: "User successfully registered !!!"})
        } catch (e) {
            console.log(e)
            res.status(404).json({message: 'Reg eror'})
        }

    }
    
    async login(req, res){
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `User ${username} not found`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Wrong password entered`})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(404).json({message: 'Login eror'})

        }
    }
    
    async getUsers(req, res){
        try {
            const users = await User.find()
            res.json(users)
            res.json("server user")
        } catch (e) {
            console.log(e)
        }
    }

    //Find elev

    // async GetElev (req, res) {
    //     const idnp = req.params.idnp;
      
    //     try {
    //       const student = await Elev.findOne({ idnp });
      
    //       if (!student) {
    //         return res.status(404).json({ error: 'Elev not found' });
    //       }
      
    //       res.json(student.grades);
    //     } catch (error) {
    //       console.error('Error fetching elev:', error);
    //       res.status(500).json({ error: 'Server error' });
    //     }
    //   };
      //Notele
    
      // async PostNote (req, res) {
      //   const idnp = req.params.idnp;
      //   const grades = req.body;
      
      //   try {
      //     let student = await Elev.findOne({ idnp });
      
      //     if (!student) {
      //       student = new Elev({ idnp, grades });
      //     } else {
      //       student.grades = grades;
      //     }
      
      //     await student.save();
      
      //     res.json(student.grades);
      //   } catch (error) {
      //     console.error('Error saving student:', error);
      //     res.status(500).json({ error: 'Server error' });
      //   }
      // };

      // async changes (req, res){
      //   try {
      //     const elevrole = new Elev()
      //     await elevrole.save()
      //     res.json("Server workd");
  
      //   } catch (error) {
      //     res.json("wtf");
      //   }

      // }

    //   ----------------------
   async addstudent (req, res) {
    try {
        const {IDNP, Name, Surname, Class, Romana, Chimie, Mate, Info, Bio, Moral_spirit } = req.body;
                  const existingStudent = await Elev.findOne({IDNP});
                  if (existingStudent) {
                    return res.status(400).json({ error: 'Student '+`${Name+' '+Surname}` +' with idnp '+ `${IDNP}` + ' already exists '  });
                  }
                  const student = new Elev({IDNP, Name, Surname, Class, Romana, Chimie, Mate, Info, Bio, Moral_spirit});
                  await student.save();
                  return res.json({message: "Elev succes aded !!!"})
    }catch (error) {
        console.error('Error adding student:', error);
    }
  };


  async postElev(req, res) {
    try {
      const { idnp } = req.params;
      const { Name, Surname, Class, Romana } = req.body;
  
      const existingStudent = await Elev.findOne({ IDNP: idnp });
  
      if (!existingStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      existingStudent.Name = Name;
      existingStudent.Surname = Surname;
      existingStudent.Class = Class;
      existingStudent.Romana = Romana;
  
      const updatedStudent = await existingStudent.save();
  
      return res.status(200).json(updatedStudent);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
  

  async getElevi(req, res){
    try {
        const users = await Elev.find()
        res.json(users)
    } catch (e) {
        console.log(e)
        }
    }
  
    async getElev(req, res){
    try {
    const {idnp} = req.params;
              const existingStudent = await Elev.findOne({IDNP: idnp});
            if (existingStudent) {
                return res.status(200).json(existingStudent);
                  }
            else {
                return res.status(404).json({ message: 'Student not found' });
              }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Server error' });
        }
    }
    
    async deleteElev(req, res) {
        try {
          const { idnp } = req.params;
      
          const existingStudent = await Elev.findOne({ IDNP: idnp });
      
          if (!existingStudent) {
            return res.status(404).json({ message: 'Elev not found' });
          }
      
          await Elev.deleteOne(existingStudent);
      
          return res.status(200).json({ message: 'Elev deleted successfully' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
        }
      }
    
}


  

module.exports = new authController()
