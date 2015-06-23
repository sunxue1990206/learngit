package com.hyh.brw.controller.base;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.hyh.platform.cache.CacheKey;

/**
 * 验证码控制层
 * @author : cz
 */
@Controller
public class CaptchaController extends BaseController {
    private static final char[] codes = {'0', 'A', '1', 'B', '2', 'C', '3', 'D', '4', 'E', '5', 'F', '6', 'G', '7',
            'H', '8', 'I', '9', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',};

    @RequestMapping("/captcha")
    public ModelAndView getKaptchaImage(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("image/jpeg");
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        HttpSession session = request.getSession();

        // 在内存中创建图象
        int width = 80, height = 32;
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

        // 获取图形上下文
        Graphics g = image.getGraphics();
        // 生成随机类
        Random random = new Random();
        // 设定背景色
        g.setColor(getRandColor(200, 250));
        g.fillRect(0, 0, width, height);
        // 设定字体
        g.setFont(new Font("Times New Roman", Font.PLAIN, 18));// Algerian
        // 画边框
        g.setColor(new Color(255, 255, 255));
        g.drawRect(0, 0, width - 1, height - 1);
        // 随机产生155条干扰线，使图象中的认证码不易被其它程序探测到
        g.setColor(getRandColor(160, 200));
        for (int i = 0; i < 155; i++) {
            int x = random.nextInt(width);
            int y = random.nextInt(height);
            int xl = random.nextInt(12);
            int yl = random.nextInt(12);
            g.drawLine(x, y, x + xl, y + yl);
        }

        // 取随机产生的认证码
        StringBuilder sRand = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            String rand = String.valueOf(codes[random.nextInt(35)]);
            sRand.append(rand);
            // 将认证码显示到图象中
            g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
            // 调用函数出来的颜色相同，可能是因为种子太接近，所以只能直接生成
            g.drawString(rand.toString(), 13 * i + 6, 16);
        }
        // 将认证码存入CACHE
        String key = session.getId() + CacheKey.CAPTCHA_CODE;
        getCache().put(key, sRand.toString().toLowerCase());

        g.dispose();
        ImageIO.write(image, "JPEG", response.getOutputStream());

        return null;
    }

    // 给定范围获得随机颜色
    private Color getRandColor(int fc, int bc) {
        Random random = new Random();
        int tempfc = fc;
        if (fc > 255){
        	tempfc = 255;
        }
        int tempbc = bc;
        if (bc > 255){
        	tempbc = 255;
        }
        int r = fc + random.nextInt(tempbc - tempfc);
        int g = fc + random.nextInt(tempbc - tempfc);
        int b = fc + random.nextInt(tempbc - tempfc);
        return new Color(r, g, b);
    }
}
