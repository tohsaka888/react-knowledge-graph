type Props = {
  toEmail: string;
  code: string;
}

export const createMail = ({ toEmail, code }: Props) => {
  return {
    from: `"tohsaka888"<tohsaka888@qq.com>`,// 发件人
    subject: '程序员之家注册验证码',//邮箱主题
    to: toEmail,//收件人，这里由post请求传递过来
    // 邮件内容，用html格式编写
    html: `
          <p>您好！欢迎注册程序员之家</p>
          <p>您的验证码是：<strong style="color:orangered;font-weight:bold">${code}</strong></p>
          <p>如果不是您本人操作，请无视此邮件</p>
      `
  };
}