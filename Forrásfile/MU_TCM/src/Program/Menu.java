package Program;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.JButton;
import java.awt.Font;
import java.awt.event.ActionListener;
import java.time.LocalDate;
import java.awt.event.ActionEvent;
import Naptar.*;
import Oraren.*;
import Terkep.*;
import SulyozattAtlagSzamitas.*;

public class Menu extends JFrame {

	private JPanel contentPane;
	private TablaKezelo tabKez;

	
	public Menu() {
		super("MU TCM: Menû");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 800, 500);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setExtendedState(JFrame.MAXIMIZED_BOTH);
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		JButton btnórared = new JButton("Órared");
		btnórared.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Timetable orarend = new Timetable(1);
				dispose();
				orarend.setVisible(true);
			}
		});
		btnórared.setBounds(250, 115, 300, 29);
		btnórared.setFont(new Font("Tahoma", Font.PLAIN, 16));
		contentPane.add(btnórared);
		
		JButton btnNaptr = new JButton("Naptár");
		btnNaptr.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				LocalDate dateTime = LocalDate.now();
				NaptarStruktura NS = new NaptarStruktura(dateTime);
				Naptar naptar = new Naptar(NS);
				dispose();
				naptar.setVisible(true);
			}
		});
		btnNaptr.setBounds(250, 183, 300, 29);
		btnNaptr.setFont(new Font("Tahoma", Font.PLAIN, 16));
		contentPane.add(btnNaptr);
		
		JButton btnTerkep = new JButton("Térkép");
		btnTerkep.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Map terkep = new Map();
				dispose();
				terkep.setVisible(true);
			}
		});
		btnTerkep.setBounds(250, 252, 300, 29);
		btnTerkep.setFont(new Font("Tahoma", Font.PLAIN, 16));
		contentPane.add(btnTerkep);
		
		JButton btnKilps = new JButton("Kilépés");
		btnKilps.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				dispose();
			}
		});
		btnKilps.setFont(new Font("Tahoma", Font.PLAIN, 16));
		btnKilps.setBounds(250, 421, 300, 29);
		contentPane.add(btnKilps);
		
		JButton btnSulyozotAtlagSzamitas = new JButton("Súlyozott átlag számítás");
		btnSulyozotAtlagSzamitas.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				tabKez = FileManager.sAtlagBeolvaso("Data\\eredmenyek.csv");
				SatlagSz csl = new SatlagSz(tabKez);
				dispose();
				csl.setVisible(true);
			}
		});
		btnSulyozotAtlagSzamitas.setFont(new Font("Tahoma", Font.PLAIN, 16));
		btnSulyozotAtlagSzamitas.setBounds(250, 311, 300, 29);
		contentPane.add(btnSulyozotAtlagSzamitas);
	}
}
