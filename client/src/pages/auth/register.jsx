    import React,{useState} from "react";
    import {Form, Input, Carousel, message, Button } from "antd";
    import {Link} from "react-router-dom";
    import { useNavigate } from "react-router-dom";



    const Register = () => {
        const [form] = Form.useForm();
        const navigate = useNavigate();
        const [loading , setLoading] = useState(false);
     
        const onFinish = async (values) => {
            setLoading(true);
            try {
              const { kullaniciAdi, email, password } = values;
              const res = await fetch("http://localhost:4000/api/auth/register", {
                method: "POST",
                body: JSON.stringify({ username: kullaniciAdi, email, password }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
               
              if (res.status === 201) {
                message.success("Kayıt Başarılı");
                form.resetFields();
                navigate("/login");
                setLoading(false);
              }
            } catch (error) {
              message.error("Kayıt Başarısız");
            }

          };
          

      
    const contentStyle = {
        margin: 0,
        height: '710px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#377699',
    };

    return (
        <div className="w-full h-screen">
        <div className="p-2 flex items-center justify-between w-full h-full">
            <div className="flex flex-col items-center justify-between h-full  md:w-[50%] w-full p-2">
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
                    label="Kulanıcı Adı"
                    name="kullaniciAdi"
                    rules={[
                    {
                        required: true,
                        message: "Lütfen Bir Kullanıcı Adı Giriniz!",
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

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
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: "Lütfen Şifrenizi Tekrar Giriniz!",
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            new Error(
                            "The new password that you entered do not match!"
                            )
                        );
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Button  htmlType="submit" className="bg-blue-500 text-white w-full py-5 flex items-center justify-center rounded-lg hover:bg-green-500 transition-all duration-300">Kaydol</Button>
                </Form>
            </div>
            <div className="flex items-center gap-x-4">
                <p>Bir Hesabınız var mı? </p>
                <Link className="text-blue-500" to="/login">Şimdi giriş yap</Link>
            </div>
            </div>

            <div className="w-[50%] h-full md:flex hidden">
            <div className="w-full h-full">
            <Carousel  autoplay={true} autoplaySpeed={3500}>
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

    export default Register;
