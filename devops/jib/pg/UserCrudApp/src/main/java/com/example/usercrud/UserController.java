package com.example.usercrud;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Map<Long, User> USERS = new ConcurrentHashMap<>();
    private static final AtomicLong ID_GEN = new AtomicLong(1);

    @GetMapping
    public List<User> getAll() {
        return new ArrayList<>(USERS.values());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        User user = USERS.get(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        long id = ID_GEN.getAndIncrement();
        user.setId(id);
        USERS.put(id, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        if (!USERS.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        user.setId(id);
        USERS.put(id, user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (USERS.remove(id) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
