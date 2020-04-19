package web.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import web.model.User;
import web.model.UserDto;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final String SERVER_URL = "http://localhost:8080/rest/";

    private final RestTemplate restTemplate;

    public UserServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<UserDto> allUsers() {
        ResponseEntity<List<UserDto>> responseEntity = restTemplate.exchange(
                SERVER_URL,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<UserDto>>() {
                });
        return responseEntity.getBody();
    }

    @Override
    public boolean addUser(UserDto userDto) {
        if (!isNameUnique(userDto)) {
            return false;
        }
        restTemplate.postForObject(SERVER_URL + "/userAdd", userDto, UserDto.class);
        return true;
    }

    @Override
    public boolean updateUser(UserDto userDto) {
        if (getUserById(userDto.getId()).getName().equals(userDto.getName()) || isNameUnique(userDto)) {
            if (userDto.getPassword().isEmpty()) {
                userDto.setPassword(getUserById(userDto.getId()).getPassword());
            }
            restTemplate.put(SERVER_URL + "/editUser", userDto, UserDto.class);
            return true;
        }
        return false;
    }

    @Override
    public void deleteUser(Long id) {
        restTemplate.delete(SERVER_URL + id);
    }

    @Override
    public UserDto getUserById(Long id) {
        return restTemplate.getForObject(SERVER_URL + "users/" + id, UserDto.class);
    }

    @Override
    public UserDto getUserByName(String name) throws IllegalStateException {
        return restTemplate.getForObject(SERVER_URL + "username/" + name, UserDto.class);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return restTemplate.getForObject(SERVER_URL + "username/" + s, User.class);
    }

    private boolean isNameUnique(UserDto userDto) {
        return allUsers().stream()
                .map(UserDto::getName)
                .noneMatch(v -> v.equals(userDto.getName()));
    }
}
