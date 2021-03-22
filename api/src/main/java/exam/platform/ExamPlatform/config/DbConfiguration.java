package exam.platform.ExamPlatform.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@ConfigurationProperties("spring.datasource")
@SuppressWarnings("unused")
public class DbConfiguration {

    private String driverClassName;
    private String url;

    @Profile("dev")
    @Bean
    public String devDatabaseConnection() {
        System.out.println(driverClassName);
        System.out.println(url);
        return "DB Coonnection for dev";
    }

    @Profile("prod")
    @Bean
    public String prodDatabaseConnection() {
        System.out.println(driverClassName);
        System.out.println(url);
        return "DB Coonnection for prod";
    }
}
