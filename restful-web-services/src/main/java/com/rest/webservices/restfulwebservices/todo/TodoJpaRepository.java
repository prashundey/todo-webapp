package com.rest.webservices.restfulwebservices.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoJpaRepository extends JpaRepository<Todo, Long> {
    /* findBy___ column name(in table -> converted camel case) as listed in Todo */
    List<Todo> findByUserName(String username);
}
