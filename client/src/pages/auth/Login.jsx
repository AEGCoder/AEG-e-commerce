import React,{useState} from "react";
import { Form, Input, Carousel, Checkbox, message, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading , setLoading] = useState(false);
     
  const onFinish = async (values) => {
      setLoading(true);
      try {
        const { email, password } = values;
        const res = await fetch("http://localhost:4000/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
            charset: "UTF-8",
          },
        });
         const user = await res.json();
        localStorage.setItem("posUser", JSON.stringify({
          username: user.username,
          email: user.email,
        })); 


        if (res.status === 200) {
          message.success("Giriş Başarılı");
          form.resetFields();
          navigate("/");
          setLoading(false);
        } else if (res.status === 404) {
          message.error("Kullanıcı Bulunamadı");
          setLoading(false);
        }
      } catch (error) {
        message.error("Giriş Başarısız");
        setLoading(false);
      }
    };
    


  const contentStyle = {
    margin: 0,
    height: "710px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#377699",
  };

  return (
    <div className="w-full h-screen">
      <div className="p-2 flex items-center justify-between w-full h-full">
        <div className="flex flex-col items-center justify-around h-full  md:w-[50%] w-full p-2">
          <div>
            <img
              src="/images/logo.png"
              alt=""
              className="w-44 h-44 object-cover"
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <Form
               form={form}
              className="md:w-[60%] w-full"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "Geçerli Bir E-mail Adresi Giriniz!",
                  },
                  {
                    required: true,
                    message: "Lütfen Bir E-mail Adresi Giriniz",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Lütfen Bir Şifre Giriniz!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Button htmlType="submit"  className="bg-blue-500 text-white w-full py-4 flex items-center justify-center rounded-lg hover:bg-green-500 transition-all duration-300">
                Giriş Yap
              </Button>
            </Form>
          </div>
          <div className="flex items-center gap-x-4">
            <p>Bir Hesabınız yok mu? </p>
            <Link className="text-blue-500" to="/register">
              Şimdi kayıt ol
            </Link>
          </div>
        </div>

        <div className="w-[50%] h-full md:flex hidden">
          <div className="w-full h-full">
            <Carousel autoplay={true} autoplaySpeed={3500}>
              <div>
                <img style={contentStyle} src="/images/logo.png" alt="" />
              </div>
              <div>
                <img style={contentStyle} src="/images/logo.png" alt="" />
              </div>
              <div>
                <img style={contentStyle} src="/images/logo.png" alt="" />
              </div>
              <div>
                <img style={contentStyle} src="/images/logo.png" alt="" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
